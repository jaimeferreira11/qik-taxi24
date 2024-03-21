import { PassengerEntity } from '.';
import { Pagination } from '../base';

export abstract class PassengerRepository {
  // required
  abstract findById(id: string | number): Promise<PassengerEntity>;
  abstract findAll(pagination?: Pagination): Promise<PassengerEntity[]>;

  // SEED
  abstract addMany(drivers: PassengerEntity[]): Promise<PassengerEntity[]>;
  abstract deleteAll(): Promise<string>;
}
