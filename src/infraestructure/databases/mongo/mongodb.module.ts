import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverRepository } from 'src/domain/driver/driver.repository';
import { InvoiceRepository } from 'src/domain/invoice';
import { PassengerRepository } from 'src/domain/passenger';
import { TripRepository } from 'src/domain/trip';
import {
  MongoInvoiceDataSource,
  MongoPassengerDataSource,
  MongoTripDataSource,
} from './datasources';
import { MongoDriverDataSource } from './datasources/mongo-driver.datasource';
import {
  DriverModel,
  DriverSchema,
  InvoiceModel,
  InvoiceSchema,
  PassengerModel,
  PassengerSchema,
  TripModel,
  TripSchema,
} from './models';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    MongooseModule.forFeature([
      {
        name: DriverModel.name,
        schema: DriverSchema,
      },
      {
        name: PassengerModel.name,
        schema: PassengerSchema,
      },
      {
        name: TripModel.name,
        schema: TripSchema,
      },
      {
        name: InvoiceModel.name,
        schema: InvoiceSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: DriverRepository,
      useClass: MongoDriverDataSource,
    },
    {
      provide: PassengerRepository,
      useClass: MongoPassengerDataSource,
    },
    {
      provide: TripRepository,
      useClass: MongoTripDataSource,
    },
    {
      provide: InvoiceRepository,
      useClass: MongoInvoiceDataSource,
    },
  ],
  exports: [
    DriverRepository,
    PassengerRepository,
    TripRepository,
    InvoiceRepository,
  ],
})
export class MongodbModule {}
