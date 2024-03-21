import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, JoiValidationSchema } from './config';
import { DatabaseModule } from './infraestructure/databases/database.module';
import { DriverModule } from './presentation/driver/driver.module';
import { InvoiceModule } from './presentation/invoice/invoice.module';
import { PassengerModule } from './presentation/passenger/passenger.module';
import { SeedModule } from './presentation/seed/seed.module';
import { TripModule } from './presentation/trip/trip.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    DatabaseModule.register({
      type: 'mongoose',
      global: true,
    }),
    SharedModule,
    DriverModule,
    PassengerModule,
    TripModule,
    InvoiceModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
