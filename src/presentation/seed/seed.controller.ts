import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from 'src/infraestructure/services';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('mongo')
  @ApiOperation({
    description:
      'Elimna los registros existentes e inserta nuevos registros de prueba en la base de datos de mongo',
    summary: 'Poblar base de datos Mongo',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: String,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  executeSeedMongo() {
    return this.seedService.executeSeedMongo();
  }
}
