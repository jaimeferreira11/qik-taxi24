import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DriverEntity } from 'src/domain/driver';
import { DriverRepository } from 'src/domain/driver/driver.repository';
import { UpdateDriverDto } from 'src/presentation/driver/dtos';
import { LocationDto } from 'src/shared/dtos';
import { CreateDriverDto } from '../../presentation/driver/dtos/create-driver.dto';
import { PaginationDto } from '../../shared/dtos/pagination.dto';

@Injectable()
export class DriverService {
  private readonly limitDriverForPassenger = 3;

  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly configService: ConfigService,
  ) {}
  async create(createDriverDto: CreateDriverDto) {
    const driver = DriverEntity.fromObject(createDriverDto);
    return await this.driverRepository.create(driver);
  }

  async findAll(paginationDto?: PaginationDto): Promise<DriverEntity[]> {
    return await this.driverRepository.findAll(paginationDto);
  }

  async findOne(id: number | string): Promise<DriverEntity> {
    const driver = await this.driverRepository.findById(id);
    if (!driver) throw new NotFoundException(`Driver with id ${id} not found`);
    return driver;
  }

  async update(
    id: number | string,
    updateDriveDto: UpdateDriverDto,
  ): Promise<void> {
    const driverDb = await this.findOne(id);

    await this.driverRepository.update(
      id,
      DriverEntity.fromObject({ ...driverDb, ...updateDriveDto, id }),
    );
  }

  async activate(id: number | string): Promise<void> {
    await this.driverRepository.activate(id);
  }

  async deactivate(id: number | string): Promise<void> {
    await this.driverRepository.deactivate(id);
  }

  async findBy(params: Record<string, any>): Promise<DriverEntity[]> {
    return await this.driverRepository.findBy(params);
  }

  async findNearbyByLocation(location: LocationDto): Promise<any[]> {
    return this.driverRepository.findNearbyLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      maxDistanceKm: this.configService.get('maxDistanceKmForDriverSearch'),
    });
  }

  async findNearestToPassenger(passengerId: string): Promise<DriverEntity[]> {
    return this.driverRepository.findNearestToPassenger(
      passengerId,
      this.limitDriverForPassenger,
    );
  }
}
