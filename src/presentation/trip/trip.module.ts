import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TripService } from 'src/infraestructure/services';
import { TripController } from './trip.controller';

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [ConfigModule],
})
export class TripModule {}
