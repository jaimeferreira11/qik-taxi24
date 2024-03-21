import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from 'src/infraestructure/services/invoice.service';
import { InvoiceEntity } from '../../domain/invoice/invoice.entity';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly inoviceService: InvoiceService) {}

  @Get()
  @ApiOperation({
    description: 'Obtiene todos las facturas',
    summary: 'Obtiene todos las facturas',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de facturas',
    type: InvoiceEntity,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  findAll() {
    return this.inoviceService.findAll();
  }
}
