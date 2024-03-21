import { DynamicModule, Module } from '@nestjs/common';
import { MongodbModule } from './mongo/mongodb.module';

interface DatabaseOptions {
  type: 'postgress' | 'mongoose'; // postgress is not implemented
  global?: boolean;
}

@Module({})
export class DatabaseModule {
  static async register({
    global = false,
    type,
  }: DatabaseOptions): Promise<DynamicModule> {
    return {
      global,
      module: DatabaseModule,
      imports: [type === 'mongoose' ? MongodbModule : null], // TODO: implement another db module
      exports: [type === 'mongoose' ? MongodbModule : null], // TODO: implement another db module
    };
  }
}
