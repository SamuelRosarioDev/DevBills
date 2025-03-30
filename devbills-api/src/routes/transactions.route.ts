import { getFinancialEvolutionSchema, indexTransactionsSchema } from './../dtos/transactions.dto';
import { Router } from "express";
import { ParamsType, validator } from "../middlewares/validator.middleware";
import { createTransactionSchema, getDashboardSchema } from "../dtos/transactions.dto";
import { TransactionsController } from "../controllers/transactions.controller";
import { TransactionsFactory } from "../factories/transactions.factory";

export const transactionsRoutes = Router();

const controller = new TransactionsController(TransactionsFactory.getServiceInstance());

transactionsRoutes.get("/", validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY
}), controller.index);

transactionsRoutes.post("/", validator({
    schema: indexTransactionsSchema,
    type: ParamsType.BODY
}), controller.create);

transactionsRoutes.get("/dashboard", validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY
}), controller.getDashboard);

transactionsRoutes.get("/financial-evolution", validator({
    schema: getFinancialEvolutionSchema,
    type: ParamsType.QUERY
}), controller.getDashboard);
