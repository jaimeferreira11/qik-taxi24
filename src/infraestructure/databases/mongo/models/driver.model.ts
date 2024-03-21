import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'drivers' })
export class DriverModel extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, default: true })
  available: boolean;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  geo: {
    type: string;
    coordinates: [number, number];
  };
}

export const DriverSchema = SchemaFactory.createForClass(DriverModel);
DriverSchema.index({ geo: '2dsphere' });

DriverSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    ret.geo = ret.geo.coordinates;
  },
});
