import express, { Router } from 'express';
import { createTransaction } from '../controllers/transactionController';

const transactionRouter: Router = express.Router();

transactionRouter.post("/transactions/:client_id", createTransaction);

export default transactionRouter;
