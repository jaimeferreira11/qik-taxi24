export interface PassengerEntityOptions {
  id: number;
  name: string;
  document: string;
  geo: { latitude: number; longitude: number };
}

export class PassengerEntity {
  id: number;
  name: string;
  document: string;
  geo: { latitude: number; longitude: number };

  constructor(options: PassengerEntityOptions) {
    const { id, name, geo } = options;
    this.id = id;
    this.name = name;
    this.geo = geo;
  }

  static readonly fromJson = (json: string): PassengerEntity => {
    const { id, name, document, geo } = JSON.parse(json === '' ? '{}' : json);

    return new PassengerEntity({
      id,
      name,
      document,
      geo,
    });
  };

  static readonly fromObject = (object: {
    [key: string]: any;
  }): PassengerEntity => {
    const { id, name, document, geo } = object;

    let coordinates = geo;
    if (geo.coordinates) {
      coordinates = {
        latitude: geo.coordinates[0],
        longitude: geo.coordinates[1],
      };
    }
    return new PassengerEntity({
      id,
      name,
      document,
      geo: coordinates,
    });
  };
}
