import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PassengerEntity } from 'src/domain/passenger';
import { PassengerService } from 'src/infraestructure/services';
import { ValidationIdPipe } from 'src/shared/pipes';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  @ApiOperation({
    description: 'Obtiene todos los pasajeros',
    summary: 'Obtiene todos los pasajeros',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: PassengerEntity,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Obtiene un pasajero por su id',
    summary: 'Obtiene un pasajero por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: PassengerEntity,
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
  @ApiParam({ name: 'id', description: 'Id del pasajero' })
  findOne(@Param('id', ValidationIdPipe) id: string) {
    return this.passengerService.findOne(id);
  }
}
