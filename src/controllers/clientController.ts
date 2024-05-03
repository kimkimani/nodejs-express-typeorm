// clientController.js

import { Client } from '../entities/Client';
import { PostgresDataSource } from '../db/PostgresDataSource';

export const getAllClients = async (req, res) => {
  try {
    const allClients = await Client.find();
    return res.json(allClients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const { client_id } = req.params;
    const oneClient = await PostgresDataSource
      .createQueryBuilder()
      .select('client')
      .from(Client, 'client')
      .leftJoinAndSelect('client.transactions', 'transaction')
      .where('client.id = :id', { id: client_id })
      .getOne();
    return res.json(oneClient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      balance,
    } = req.body;

    const newClient = Client.create({
      first_name,
      last_name,
      email,
      balance,
    });
    await newClient.save();
    return res.json(newClient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { client_id } = req.params;
    const response = await Client.delete(parseInt(client_id, 10));
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
