import { Module } from '@nestjs/common';
import { InvoiceService } from 'src/infraestructure/services/invoice.service';
import { InvoiceController } from './invoice.controller';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [],
})
export class InvoiceModule {}
