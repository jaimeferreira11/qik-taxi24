import { GenericRepository, Pagination } from '../base';
import { DriverEntity } from './driver.entity';

export abstract class DriverRepository
  implements GenericRepository<DriverEntity>
{
  // generics
  abstract create(driver: DriverEntity): Promise<void>;
  abstract update(id: string | number, driver: DriverEntity): Promise<void>;
  abstract activate(id: string | number): Promise<void>;
  abstract deactivate(id: string | number): Promise<void>;

  // required
  abstract findById(id: string | number): Promise<DriverEntity>;
  abstract findAll(pagination?: Pagination): Promise<DriverEntity[]>;
  abstract findBy(params: Record<string, any>): Promise<DriverEntity[]>;
  abstract findNearbyLocation({
    latitude,
    longitude,
    maxDistanceKm,
  }: {
    latitude: number;
    longitude: number;
    maxDistanceKm: number;
  }): Promise<any[]>;

  abstract findNearestToPassenger(
    passengerId: string | number,
    limit: number,
  ): Promise<DriverEntity[]>;

  // SEED
  abstract addMany(drivers: DriverEntity[]): Promise<DriverEntity[]>;
  abstract deleteAll(): Promise<string>;
}
