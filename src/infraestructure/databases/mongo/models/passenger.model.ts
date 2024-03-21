import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'passengers' })
export class PassengerModel extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  document: string;

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

export const PassengerSchema = SchemaFactory.createForClass(PassengerModel);
PassengerSchema.index({ geo: '2dsphere' });

PassengerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    ret.geo = ret.geo.coordinates;
  },
});
