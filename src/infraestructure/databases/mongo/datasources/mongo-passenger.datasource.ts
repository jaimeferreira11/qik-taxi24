import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassengerEntity, PassengerRepository } from 'src/domain/passenger';
import { PaginationDto } from 'src/shared/dtos';
import { PassengerModel } from '../models';

@Injectable()
export class MongoPassengerDataSource implements PassengerRepository {
  constructor(
    @InjectModel(PassengerModel.name)
    private readonly passengerModel: Model<PassengerModel>,
  ) {}

  async addMany(passengers: PassengerEntity[]): Promise<any[]> {
    return await this.passengerModel.insertMany(passengers);
  }

  async deleteAll(): Promise<string> {
    await this.passengerModel.deleteMany({});
    return 'All passengers deleted';
  }

  async findAll(pagination: PaginationDto): Promise<PassengerEntity[]> {
    const { limit, offset } = pagination || {};

    const passengers = await this.passengerModel
      .find()
      .limit(limit)
      .skip(offset);

    return passengers.map((passenger) => PassengerEntity.fromObject(passenger));
  }
  async findById(id: string): Promise<PassengerEntity> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Not valid mongo id');
    }
    const passenger = await this.passengerModel.findById(id);
    if (!passenger)
      throw new NotFoundException(`Passenger with id ${id} not found`);
    return PassengerEntity.fromObject(passenger);
  }
}
