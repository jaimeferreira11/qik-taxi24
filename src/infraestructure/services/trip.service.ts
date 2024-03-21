import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DriverRepository } from 'src/domain/driver/driver.repository';
import {
  InvoiceDetail,
  InvoiceEntity,
  InvoiceRepository,
} from 'src/domain/invoice';
import { TripEntity, TripRepository } from 'src/domain/trip';
import { UpdateDriverDto } from 'src/presentation/driver/dtos';
import { CreateTripDto } from 'src/presentation/trip/dto';

@Injectable()
export class TripService {
  constructor(
    private readonly tripRespository: TripRepository,
    private readonly invoiceRepository: InvoiceRepository,
    private readonly driverRespository: DriverRepository,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const trip = TripEntity.fromObject(createTripDto);
    return await this.tripRespository.create(trip);
  }

  async update(
    id: number | string,
    updateDriveDto: UpdateDriverDto,
  ): Promise<void> {
    const tripDB = await this.findOne(id);

    await this.tripRespository.update(
      id,
      TripEntity.fromObject({ ...tripDB, ...updateDriveDto, id }),
    );
  }

  async findOne(id: number | string): Promise<TripEntity> {
    const trip = await this.tripRespository.findById(id);
    if (!trip) throw new NotFoundException(`Trip with id ${id} not found`);
    return trip;
  }

  //
  async findActives(): Promise<TripEntity[]> {
    return await this.tripRespository.findBy({
      status: 'in_progress',
    });
  }

  async createTripWithDriverRandom(
    createTripDto: CreateTripDto,
  ): Promise<void> {
    const drivers = await this.driverRespository.findNearestToPassenger(
      createTripDto.passengerId,
      1,
    );

    if (!drivers) throw new NotFoundException('No available Driver');

    createTripDto = {
      driverId: drivers[0].id,
      passengerId: createTripDto.passengerId,
    };

    return await this.create(createTripDto);
  }

  async complete(id: string): Promise<void> {
    const currentTrip = await this.tripRespository.findById(id);

    if (!currentTrip)
      throw new NotFoundException(`Trip with id ${id} not found`);

    if (currentTrip.status === 'completed')
      throw new ForbiddenException(`Trip already finished`);

    await this.tripRespository.completed(id);

    await this.invoiceRepository.create(this.createInvoice(id));
    return;
  }

  private createInvoice(tripId: string): InvoiceEntity {
    const invoiceDetail: [InvoiceDetail] = [
      {
        description: 'Transportation service for journey',
        quantity: 1,
        unitPrice: 100,
      },
    ];

    const total = invoiceDetail.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
    return new InvoiceEntity({
      items: invoiceDetail,
      total,
      tripId,
    });
  }
}
