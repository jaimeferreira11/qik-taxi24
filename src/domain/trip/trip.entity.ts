export type TripStatus = 'pending' | 'in_progress' | 'completed';

export interface TripEntityOptions {
  id?: number | string;
  driverId: number | string;
  passengerId: number | string;
  status?: TripStatus;
  createdAt?: Date;
}

export class TripEntity {
  id?: number | string;
  driverId: number | string;
  passengerId: number | string;
  status?: TripStatus;
  createdAt?: Date;

  constructor(options: TripEntityOptions) {
    const {
      id,
      driverId,
      passengerId,
      status = 'pending',
      createdAt = new Date(),
    } = options;
    this.id = id;
    this.driverId = driverId;
    this.passengerId = passengerId;
    this.status = status;
    this.createdAt = createdAt;
  }

  static readonly fromJson = (json: string): TripEntity => {
    const { id, driverId, passengerId, status, createdAt } = JSON.parse(
      json === '' ? '{}' : json,
    );

    return new TripEntity({
      id,
      driverId,
      passengerId,
      status,
      createdAt,
    });
  };

  static readonly fromObject = (object: { [key: string]: any }): TripEntity => {
    const { id, driverId, passengerId, status, createdAt } = object;

    return new TripEntity({
      id,
      driverId,
      passengerId,
      status,
      createdAt,
    });
  };
}
