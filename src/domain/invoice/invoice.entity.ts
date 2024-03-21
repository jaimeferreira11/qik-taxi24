export interface InvoiceEntityOptions {
  id?: number | string;
  items: InvoiceDetail[];
  createdAt?: Date;
  total: number;
  tripId: number | string;
}

export interface InvoiceDetail {
  description: string;
  quantity: number;
  unitPrice: number;
}

export class InvoiceEntity {
  id?: number | string;
  items: InvoiceDetail[];
  createdAt?: Date;
  total: number;
  tripId: number | string;

  constructor(options: InvoiceEntityOptions) {
    const { id, items, total, tripId, createdAt = new Date() } = options;
    this.id = id;
    this.items = items;
    this.createdAt = createdAt;
    this.total = total;
    this.createdAt = createdAt;
    this.tripId = tripId;
  }

  static readonly fromJson = (json: string): InvoiceEntity => {
    const { id, items, total, tripId, createdAt } = JSON.parse(
      json === '' ? '{}' : json,
    );

    return new InvoiceEntity({
      id,
      items,
      total,
      createdAt,
      tripId,
    });
  };

  static readonly fromObject = (object: {
    [key: string]: any;
  }): InvoiceEntity => {
    const { id, items, total, tripId, createdAt } = object;

    return new InvoiceEntity({
      id,
      items,
      total,
      createdAt,
      tripId,
    });
  };
}
