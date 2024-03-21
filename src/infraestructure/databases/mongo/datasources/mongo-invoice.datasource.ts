import { InjectModel } from '@nestjs/mongoose';

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pagination } from 'src/domain/base';
import { InvoiceEntity, InvoiceRepository } from 'src/domain/invoice';
import { InvoiceModel } from '../models';

@Injectable()
export class MongoInvoiceDataSource implements InvoiceRepository {
  constructor(
    @InjectModel(InvoiceModel.name)
    private readonly invoiceModel: Model<InvoiceModel>,
  ) {}
  async findAll(pagination?: Pagination): Promise<any[]> {
    const { limit, offset } = pagination || {};

    const drivers = await this.invoiceModel
      .find()
      .populate({
        path: 'trip',
        populate: [{ path: 'passenger' }, { path: 'driver' }],
      })
      .limit(limit)
      .skip(offset);

    return drivers;
  }
  async create(invoice: InvoiceEntity): Promise<void> {
    await this.invoiceModel.create({
      trip: invoice.tripId,
      ...invoice,
    });
  }

  async deleteAll(): Promise<string> {
    await this.invoiceModel.deleteMany({});
    return 'All invoices deleted';
  }
}
