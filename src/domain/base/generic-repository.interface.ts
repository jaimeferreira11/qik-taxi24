import { Pagination } from '.';

export interface GenericRepository<T> {
  findAll(pagination?: Pagination): Promise<T[]>;
  findById(id: string | number): Promise<T>;
  create(driver: T): Promise<void>;
  update(id: string | number, driver: T): Promise<void>;
  activate(id: string | number): Promise<void>;
  deactivate(id: string | number): Promise<void>;
}
