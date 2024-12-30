import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin123',
  database: 'project_management',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // À désactiver en production
};
