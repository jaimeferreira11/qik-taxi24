export interface DriverEntityOptions {
  id?: number | string;
  name: string;
  available?: boolean;
  distance?: number;
  geo: { latitude: number; longitude: number };
}

export class DriverEntity {
  id?: number | string;
  name: string;
  available?: boolean;
  geo: { latitude: number; longitude: number };

  constructor(options: DriverEntityOptions) {
    const { id, name, geo, available = true } = options;
    this.id = id;
    this.name = name;
    this.geo = geo;
    this.available = available;
  }

  static readonly fromJson = (json: string): DriverEntity => {
    const { id, name, available, geo } = JSON.parse(json === '' ? '{}' : json);

    return new DriverEntity({
      id,
      name,
      available,
      geo,
    });
  };

  static readonly fromObject = (object: {
    [key: string]: any;
  }): DriverEntity => {
    const { id, name, available, geo, distance } = object;

    let coordinates = geo;
    if (geo.coordinates) {
      coordinates = {
        latitude: geo.coordinates[0],
        longitude: geo.coordinates[1],
      };
    }
    return new DriverEntity({
      id,
      name,
      available,
      geo: coordinates,
      distance,
    });
  };
}
