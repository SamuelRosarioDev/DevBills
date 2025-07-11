import { Router } from "express";
import { TransactionsController } from "../controllers/transactions.controller";
import {
	createTransactionSchema,
	getDashboardSchema,
	getFinancialEvolutionSchema,
    indexTransactionsSchema
} from "../dtos/transactions.dto";
import { TransactionsFactory } from "../factories/transactions.factory";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ParamsType, validator } from "../middlewares/validator.middleware";

export const transactionsRoutes = Router();

const controller = new TransactionsController(
	TransactionsFactory.getServiceInstance(),
);
transactionsRoutes.use(authMiddleware);

transactionsRoutes.get(
	"/",
	validator({
		schema: indexTransactionsSchema,
		type: ParamsType.QUERY,
	}),
	controller.index,
);

transactionsRoutes.post(
	"/",
	validator({
		schema: createTransactionSchema,
		type: ParamsType.BODY,
	}),
	controller.create,
);

transactionsRoutes.get(
	"/dashboard",
	validator({
		schema: getDashboardSchema,
		type: ParamsType.QUERY,
	}),
	controller.getDashboard,
);

transactionsRoutes.get(
	"/financial-evolution",
	validator({
		schema: getFinancialEvolutionSchema,
		type: ParamsType.QUERY,
	}),
	controller.getFinancialEvolution,
);
