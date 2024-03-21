import { TripEntity } from './trip.entity';

export abstract class TripRepository {
  abstract findById(id: string | number): Promise<TripEntity>;
  abstract findBy(params: Record<string, any>): Promise<TripEntity[]>;

  abstract create(trip: TripEntity): Promise<void>;
  abstract update(id: string | number, trip: TripEntity): Promise<void>;
  abstract completed(id: string | number): Promise<TripEntity>;

  // SEED
  abstract addMany(trips: TripEntity[]): Promise<TripEntity[]>;
  abstract deleteAll(): Promise<string>;
}
