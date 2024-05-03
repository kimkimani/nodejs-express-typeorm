import express from 'express';
import { PostgresDataSource } from './db/PostgresDataSource'
import clientRouter from './routes/clientRouter';
import transactionRouter from './routes/transactionRouter';

const main = async () => {
  PostgresDataSource.initialize()
    .then(() => {
      console.log(`Postgres Data Source has been initialized`);
    })
    .catch((err) => {
      console.error('Error during Postgres Data Source initialization ====>', err);
      throw new Error("Error during Postgres Data Source initialization")
    });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(clientRouter);
  app.use(transactionRouter);

  const port = process.env.PORT || 4000
  app.listen(port, () => console.log(`The server is listening on port ${port}`));
}

main()
