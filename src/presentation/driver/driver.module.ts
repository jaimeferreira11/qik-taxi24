import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriverService } from 'src/infraestructure/services';
import { DriverController } from './driver.controller';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
  imports: [ConfigModule],
})
export class DriverModule {}
