import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, Types } from 'mongoose';
import { DriverModel } from './driver.model';
import { PassengerModel } from './passenger.model';

@Schema({ collection: 'trips' })
export class TripModel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DriverModel.name })
  driver: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PassengerModel.name })
  passenger: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop({
    type: Date,
    default: Date.now(),
    required: true,
  })
  createdAt: Date;
}

export const TripSchema = SchemaFactory.createForClass(TripModel);

TripSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
