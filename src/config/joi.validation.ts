import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3000),
  CANT_DRIVERS_DUMMY: Joi.number().default(40),
  CANT_PASSENGERS_DUMMY: Joi.number().default(10),
  CENTER_CORDINATES_LAT: Joi.number().default(-25.2637),
  CENTER_CORDINATES_LNG: Joi.number().default(-57.5759),
  MAX_DISTANCE_KM_FOR_DRIVER_SEARCH: Joi.number().default(3),
});
