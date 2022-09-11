import { DataSourceOptions, DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  database: 'poll_platform',
  username: 'root',
  password: 'root',

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  entities: ['src/entities/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
