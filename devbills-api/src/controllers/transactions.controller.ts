import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetFinancialEvolutionDTO } from "./../dtos/transactions.dto";
import type {
	CreateTransactionDTO,
	GetDashboardDTO,
	IndexTransactionsDTO,
} from "../dtos/transactions.dto";
import type { TransactionsService } from "../services/transactions.service";
import type { BodyRequest, QueryRequest } from "./types";

export class TransactionsController {
	constructor(private transactionsService: TransactionsService) {}

	create = async (
		req: BodyRequest<CreateTransactionDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const userId = req.userId;
			if (!userId) {
				throw new Error("User ID is required");
			}
			const { title, amount, date, categoryId, type } = req.body;
			const result = await this.transactionsService.create({
				title,
				amount,
				date,
				categoryId,
				type,
			}, userId);
			res.status(StatusCodes.CREATED).json(result);
		} catch (err) {
			next(err);
		}
	};

	index = async (
		req: QueryRequest<IndexTransactionsDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const userId = req.userId;
			if (!userId) {
				throw new Error("User ID is required");
			}
			const { title, categoryId, beginDate, endDate } = req.query;
			const result = await this.transactionsService.index({
				title,
				categoryId,
				beginDate,
				endDate,
			}, userId);
			res.status(StatusCodes.OK).json(result);
		} catch (err) {
			next(err);
		}
	};

	getDashboard = async (
		req: QueryRequest<GetDashboardDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const userId = req.userId;
			if (!userId) {
				throw new Error("User ID is required");
			}
			const { beginDate, endDate } = req.query;
			const result = await this.transactionsService.getDashboard({
				beginDate,
				endDate,
			}, userId);
			res.status(StatusCodes.OK).json(result);
		} catch (err) {
			next(err);
		}
	};

	getFinancialEvolution = async (
		req: QueryRequest<GetFinancialEvolutionDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const userId = req.userId;
			if (!userId) {
				throw new Error("User ID is required");
			}
			const { year } = req.query;
			const result = await this.transactionsService.getFinancialEvolution({
				year,
			}, userId);
			res.status(StatusCodes.OK).json(result);
		} catch (err) {
			next(err);
		}
	};
}