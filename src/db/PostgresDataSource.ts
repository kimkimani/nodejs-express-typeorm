import { DataSource } from 'typeorm'
import { Client } from '../entities/Client';
import { Transaction } from '../entities/Transaction';

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass",
  database: "bank",
  entities: [Client, Transaction],
  synchronize: false,
  migrations: ['/migrations/*.ts'],
  migrationsTableName: "task_migrations",
})

