import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TripEntity, TripRepository } from 'src/domain/trip';
import { TripModel } from '../models';

@Injectable()
export class MongoTripDataSource implements TripRepository {
  constructor(
    @InjectModel(TripModel.name)
    private readonly tripModel: Model<TripModel>,
  ) {}

  async addMany(trips: TripEntity[]): Promise<any> {
    const models = trips.map((entity) => ({
      ...entity,
      driver: entity.driverId,
      passenger: entity.passengerId,
    }));

    return await this.tripModel.insertMany(models);
  }

  async deleteAll(): Promise<string> {
    await this.tripModel.deleteMany({});
    return 'All trips deleted';
  }

  async findBy(params: Record<string, any>): Promise<TripEntity[]> {
    const trips = await this.tripModel.find(params);

    return trips.map((trip) =>
      TripEntity.fromObject({
        ...trip.toJSON(),
        driverId: trip.driver._id,
        passengerId: trip.passenger._id,
      }),
    );
  }

  async findById(id: string): Promise<TripEntity> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Not valid mongo id');
    }
    const trip = await this.tripModel.findById(id);
    if (!trip) throw new NotFoundException(`Trip with id ${id} not found`);
    return TripEntity.fromObject(trip);
  }

  async create(trip: TripEntity): Promise<void> {
    await this.tripModel.create({
      driver: trip.driverId,
      passenger: trip.passengerId,
      ...trip,
    });
  }

  async update(id: string, trip: TripEntity): Promise<void> {
    await this.findById(id);
    await this.tripModel.updateOne({ id, ...trip });
  }

  async completed(id: string): Promise<TripEntity> {
    const trip = await this.findById(id);

    await this.tripModel.findByIdAndUpdate(id, {
      id,
      ...trip,
      status: 'completed',
    });

    return { ...trip, status: 'completed' };
  }
}
