import { Module } from '@nestjs/common';
import { PassengerService } from 'src/infraestructure/services';
import { PassengerController } from './passenger.controller';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService],
  imports: [],
})
export class PassengerModule {}
