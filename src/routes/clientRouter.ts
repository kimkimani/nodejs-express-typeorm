// clientRoutes.js

import express from 'express';
import * as clientController from '../controllers/clientController';

const clientRouter = express.Router();

clientRouter.get(`/clients`, clientController.getAllClients);
clientRouter.get(`/clients/:client_id`, clientController.getClientById);
clientRouter.post('/clients/create', clientController.createClient);
clientRouter.delete('/clients/:client_id', clientController.deleteClient);

export default clientRouter;
