import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, Types } from 'mongoose';
import { TripModel } from './trip.model';

@Schema({ collection: 'invoices' })
export class InvoiceModel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TripModel.name })
  trip: Types.ObjectId;

  @Prop({
    required: true,
  })
  total: number;

  @Prop({
    required: true,
    type: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        unitPrice: { type: Number, required: true },
      },
    ],
  })
  items: [
    {
      description: string;
      quantity: number;
      unitPrice: number;
    },
  ];

  @Prop({
    type: Date,
    default: Date.now(),
    required: true,
  })
  createdAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceModel);

InvoiceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
