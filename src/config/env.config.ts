export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGODB,
  port: +process.env.PORT || 3000,
  cantDriversDummy: +process.env.CANT_DRIVERS_DUMMY,
  cantPassengersDummy: +process.env.CANT_PASSENGERS_DUMMY,
  centerCordinatesLat: +process.env.CENTER_CORDINATES_LAT,
  centerCordinatesLng: +process.env.CENTER_CORDINATES_LNG,
  maxDistanceKmForDriverSearch: +process.env.MAX_DISTANCE_KM_FOR_DRIVER_SEARCH,
});
