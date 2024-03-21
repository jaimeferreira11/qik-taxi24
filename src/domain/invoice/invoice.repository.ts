import { Pagination } from '../base';
import { InvoiceEntity } from './invoice.entity';

export abstract class InvoiceRepository {
  abstract findAll(pagination?: Pagination): Promise<InvoiceEntity[]>;

  abstract create(invoice: InvoiceEntity): Promise<void>;

  abstract deleteAll(): Promise<string>;
}
