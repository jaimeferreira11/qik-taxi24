import { Injectable } from '@nestjs/common';
import { InvoiceEntity, InvoiceRepository } from 'src/domain/invoice';
import { CreateInvoiceDto } from 'src/presentation/invoice/dtos';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async findAll(): Promise<InvoiceEntity[]> {
    return await this.invoiceRepository.findAll();
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<void> {
    const total = createInvoiceDto.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );

    const invoice = InvoiceEntity.fromObject({ ...createInvoiceDto, total });
    return await this.invoiceRepository.create(invoice);
  }
}
