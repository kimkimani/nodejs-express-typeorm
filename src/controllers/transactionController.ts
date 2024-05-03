import { Request, Response } from 'express';
import { Transaction, TransactionTypes } from '../entities/Transaction';
import { Client } from '../entities/Client';

export const createTransaction = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { client_id } = req.params;
    const { amount, type } = req.body;
    const client = await Client.findOneBy({ id: parseInt(client_id, 10) });

    if (!client) return res.json({ message: "Client not found" });

    const newTransaction = Transaction.create({
      amount: parseInt(amount, 10),
      type,
      client,
    });
    await newTransaction.save();

    if (type === TransactionTypes.DEPOSIT) {
      client.balance = client.balance + newTransaction.amount;
  } else if (type === TransactionTypes.WITHDRAW) {
      if (client.balance >= newTransaction.amount) {
          client.balance = client.balance - newTransaction.amount;
      } else {
          return res.json({ message: "Insufficient balance" });
      }
  }
  await client.save();

    return res.json({ message: "Transaction Created." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
