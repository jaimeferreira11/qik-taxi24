import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { DriverEntity } from 'src/domain/driver';
import { TripService } from 'src/infraestructure/services';
import { ValidationIdPipe } from 'src/shared/pipes';
import { CreateTripDto } from './dto';

@ApiTags('Trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    description:
      'El pasajero crea un viaje y asigna un conductor por proximidad si no es enviado',
    summary: 'Crea un viaje',
  })
  @ApiResponse({ status: 201, description: 'Viaje creado', type: null })
  @ApiResponse({ status: 400, description: 'Parámetros no válidos' })
  @ApiResponse({ status: 404, description: 'Pasajero no encontrado' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  create(@Body() createTipDto: CreateTripDto): void {
    this.tripService.createTripWithDriverRandom(createTipDto);
  }

  @Patch(':id/complete')
  @ApiOperation({
    description: 'Finaliza el viaje (estado __completed__) de un id recibido',
    summary: 'Completa un viaje',
  })
  @ApiResponse({ status: 201, description: 'Viaje creado', type: null })
  @ApiResponse({ status: 400, description: 'Parámetros no válidos' })
  @ApiResponse({ status: 404, description: 'Pasajero no encontrado' })
  @ApiResponse({
    status: HttpStatusCode.Forbidden,
    description: 'El viaje no es valido',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiParam({ name: 'id', description: 'Id del viaje' })
  update(@Param('id', ValidationIdPipe) id: string) {
    return this.tripService.complete(id);
  }

  @Get('actives')
  @ApiOperation({
    summary: 'Obtiene los viajes activos',
    description: 'Obtiene los viajes activos, con estado: "__in_progress__"',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DriverEntity,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  findAvailable() {
    return this.tripService.findActives();
  }
}
