import { Injectable, NotFoundException } from '@nestjs/common';
import { PassengerEntity, PassengerRepository } from 'src/domain/passenger';
import { PaginationDto } from '../../shared/dtos/pagination.dto';

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  async findAll(paginationDto?: PaginationDto): Promise<PassengerEntity[]> {
    return await this.passengerRepository.findAll(paginationDto);
  }

  async findOne(id: number | string): Promise<PassengerEntity> {
    const passenger = await this.passengerRepository.findById(id);
    if (!passenger)
      throw new NotFoundException(`Passenger with id ${id} not found`);
    return passenger;
  }
}
