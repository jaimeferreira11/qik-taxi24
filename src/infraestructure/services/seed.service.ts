import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DriverEntity } from 'src/domain/driver';
import { DriverRepository } from 'src/domain/driver/driver.repository';
import { InvoiceRepository } from 'src/domain/invoice';
import { PassengerEntity } from 'src/domain/passenger';
import { TripEntity, TripRepository } from 'src/domain/trip';
import { PassengerRepository } from '../../domain/passenger/passenger.repository';

@Injectable()
export class SeedService {
  private readonly maxDistanceKm = 10;
  private readonly cantTripsInProgressDummy = 10;
  private locationCenter: { latitude: number; longitude: number };
  private cantOfDrivers: number;
  private cantOfPassengers: number;

  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly passengerRepository: PassengerRepository,
    private readonly tripRepository: TripRepository,
    private readonly invoiceRepository: InvoiceRepository,
    private readonly configService: ConfigService,
  ) {
    this.cantOfDrivers = this.configService.get('cantDriversDummy');
    this.cantOfPassengers = this.configService.get('cantPassengersDummy');
    this.locationCenter = {
      latitude: this.configService.get('centerCordinatesLat'),
      longitude: this.configService.get('centerCordinatesLng'),
    };
  }

  async executeSeedMongo(): Promise<string[]> {
    console.log('Execute SEED mongo');

    const randomDrivers = this.generateRandomDrivers(this.cantOfDrivers);
    const randomPassengers = this.generateRandomPassenger(
      this.cantOfPassengers,
    );

    let resp: string[] = [];

    //drivers
    await this.driverRepository.deleteAll();
    const driversAdded = await this.driverRepository.addMany(randomDrivers);
    resp = [`${randomDrivers.length} drivers added`];

    // passengers
    await this.passengerRepository.deleteAll();
    const passengerAdded =
      await this.passengerRepository.addMany(randomPassengers);
    resp = [...resp, `${randomPassengers.length} passengers added`];

    // trips
    const randomTrips = this.generateRandomTrips(driversAdded, passengerAdded);
    await this.tripRepository.deleteAll();
    await this.tripRepository.addMany(randomTrips);

    resp = [...resp, `${randomTrips.length} trips added`];

    // invoices
    await this.invoiceRepository.deleteAll();

    return resp;
  }

  private generateRandomPassenger = (
    cantPassengers: number,
  ): PassengerEntity[] => {
    const passengers: PassengerEntity[] = [];

    for (let i = 0; i < cantPassengers; i++) {
      const randomLocation = this.generateRandomCoordinates();
      const passenger: any = {
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        document: this.randomNumber(1000000, 5000000),
        geo: {
          coordinates: [randomLocation.latitude, randomLocation.longitude],
        },
      };
      passengers.push(passenger);
    }

    return passengers;
  };

  private generateRandomDrivers = (cantDrivers: number): DriverEntity[] => {
    const drivers: DriverEntity[] = [];

    for (let i = 0; i < cantDrivers; i++) {
      const randomLocation = this.generateRandomCoordinates();
      const driver: any = {
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        geo: {
          coordinates: [randomLocation.latitude, randomLocation.longitude],
        },
        available: i % 3 == 0 ? false : true,
      };

      drivers.push(driver);
    }

    return drivers;
  };

  private generateRandomCoordinates = (): {
    latitude: number;
    longitude: number;
  } => {
    const degreesPerRadius = this.maxDistanceKm / 111.32;
    const latitude =
      this.locationCenter.latitude +
      this.randomNumber(-degreesPerRadius, degreesPerRadius);
    const longitude =
      this.locationCenter.longitude +
      this.randomNumber(-degreesPerRadius, degreesPerRadius);
    return { latitude: latitude, longitude: longitude };
  };

  private generateRandomTrips = (
    drivers: DriverEntity[],
    passengers: PassengerEntity[],
  ): TripEntity[] => {
    const trips: TripEntity[] = [];

    for (let i = 0; i < this.cantTripsInProgressDummy; i++) {
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      const randomPassenger =
        passengers[Math.floor(Math.random() * passengers.length)];
      const newTrip: TripEntity = {
        driverId: randomDriver.id,
        passengerId: randomPassenger.id,
        status: 'in_progress',
      };

      trips.push(newTrip);
    }

    return trips;
  };

  private randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };
}
