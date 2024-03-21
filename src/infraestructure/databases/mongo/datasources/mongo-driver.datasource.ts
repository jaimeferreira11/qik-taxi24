import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DriverEntity } from 'src/domain/driver';
import { DriverRepository } from 'src/domain/driver/driver.repository';
import { PassengerRepository } from 'src/domain/passenger';
import { DriverNearbyResponseDto } from 'src/presentation/driver/dtos';
import { PaginationDto } from 'src/shared/dtos';
import { DriverModel, PassengerModel } from '../models';

@Injectable()
export class MongoDriverDataSource implements DriverRepository {
  constructor(
    @InjectModel(DriverModel.name)
    private readonly driverModel: Model<DriverModel>,
    @InjectModel(PassengerModel.name)
    private readonly passengerModel: Model<PassengerModel>,
    private readonly passengerRepository: PassengerRepository,
  ) {}

  async create(driver: DriverEntity): Promise<void> {
    await this.driverModel.create(driver);
  }
  async update(id: string, driver: DriverEntity): Promise<void> {
    await this.findById(id);
    await this.driverModel.updateOne({ id, ...driver });
  }

  async activate(id: string): Promise<void> {
    const driver = await this.findById(id);
    await this.driverModel.updateOne({ id, active: true, ...driver });
  }

  async deactivate(id: string): Promise<void> {
    const driver = await this.findById(id);
    await this.driverModel.updateOne({ id, active: false, ...driver });
  }

  async addMany(drivers: DriverEntity[]): Promise<any[]> {
    return await this.driverModel.insertMany(drivers);
  }

  async deleteAll(): Promise<string> {
    await this.driverModel.deleteMany({});
    return 'All drivers deleted';
  }

  //

  async findAll(pagination: PaginationDto): Promise<DriverEntity[]> {
    const { limit, offset } = pagination || {};

    const drivers = await this.driverModel.find().limit(limit).skip(offset);

    return drivers.map((driver) => DriverEntity.fromObject(driver));
  }
  async findById(id: string): Promise<DriverEntity> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Not valid mongo id');
    }
    const driver = await this.driverModel.findById(id);
    if (!driver)
      throw new NotFoundException(`Passenger with id ${id} not found`);
    return DriverEntity.fromObject(driver);
  }

  async findBy(params: Record<string, any>): Promise<DriverEntity[]> {
    const drivers = await this.driverModel.find(params);
    return drivers.map((driver) => DriverEntity.fromObject(driver));
  }

  async findNearbyLocation({
    latitude,
    longitude,
    maxDistanceKm,
    limit,
  }: {
    latitude: number;
    longitude: number;
    maxDistanceKm: number;
    limit?: number;
  }): Promise<DriverNearbyResponseDto[]> {
    // const drivers: DriverNearbyResponseDto[] = await this.driverModel.aggregate(
    const aggregationPipeline: any[] = [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          query: {
            available: true,
          },
          distanceField: 'distance',
          maxDistance: maxDistanceKm * 1000,
          distanceMultiplier: 1 / 1000,
        },
      },
      {
        $addFields: {
          distance: { $round: ['$distance', 2] },
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          available: 1,
          location: 1,
          distance: 1,
          geo: '$geo.coordinates',
        },
      },
      {
        $sort: {
          distance: 1,
        },
      },
    ];

    if (limit)
      aggregationPipeline.push({
        $limit: limit,
      });

    return await this.driverModel.aggregate(aggregationPipeline);
  }

  async findNearestToPassenger(
    passengerId: string | number,
    limit: number,
  ): Promise<DriverEntity[]> {
    const passenger = await this.passengerRepository.findById(passengerId);

    const drivers = await this.findNearbyLocation({
      latitude: passenger.geo.latitude,
      longitude: passenger.geo.longitude,
      maxDistanceKm: 100,
      limit: limit,
    });

    return drivers.map((driver) => DriverEntity.fromObject(driver));
  }
}
