import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverEntity } from 'src/domain/driver';
import { DriverService } from 'src/infraestructure/services/driver.service';
import { LocationDto } from 'src/shared/dtos';
import { ValidationIdPipe } from 'src/shared/pipes';
import { DriverNearbyResponseDto } from './dtos';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driversService: DriverService) {}

  @Get()
  @ApiOperation({
    description: 'Obtiene todos los conductores',
    summary: 'Obtiene todos los conductores',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DriverEntity,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  findAll() {
    return this.driversService.findAll();
  }

  @Get('nearby')
  @ApiOperation({
    description:
      'Obtiene conductores cercanos a un radio de [x] Km, definido en la aplicación',
    summary: 'Obtiene conductores cercanos a un radio definido',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DriverNearbyResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  findNearby(@Query() locationDTO: LocationDto) {
    return this.driversService.findNearbyByLocation(locationDTO);
  }

  @Get('available')
  @ApiOperation({
    description: 'Obtiene conductores habilitados',
    summary: 'Obtiene conductores habilitados',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DriverEntity,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  findAvailable() {
    return this.driversService.findBy({ available: true });
  }

  @Get('/nearest/passenger/:passengerId')
  @ApiOperation({
    summary: 'Obtiene hasta 3 conductores mas cercanos al pasajero',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de conductores cercanos',
    type: DriverEntity,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Error inesperado' })
  @ApiResponse({
    status: 404,
    description: 'Pasajero no encontrado con ese ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Parametro no válido',
  })
  @ApiParam({ name: 'passengerId', description: 'Id del pasajero' })
  async getNearestDrivers(
    @Param('passengerId', ValidationIdPipe) passengerId: string,
  ): Promise<DriverEntity[]> {
    return await this.driversService.findNearestToPassenger(passengerId);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Obtiene un conductor por su id',
    summary: 'Obtiene un conductor por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DriverEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Conductor no encontrado con ese ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Parametro no válido',
  })
  @ApiResponse({ status: 500, description: 'Error inesperado' })
  @ApiParam({ name: 'id', description: 'Id del conductor' })
  findOne(@Param('id', ValidationIdPipe) id: string) {
    return this.driversService.findOne(id);
  }
}
