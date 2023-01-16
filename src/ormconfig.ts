import { DataSource, DataSourceOptions } from 'typeorm';
 
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'neoncat',
  password: 'Mypassis1',
  database: 'marfashion',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;