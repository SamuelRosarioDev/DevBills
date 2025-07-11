import type {
	GetDashboardDTO,
	GetFinancialEvolutionDTO,
	IndexTransactionsDTO,
} from "../../dtos/transactions.dto";
import type { Balance } from "../../entities/balance.entity";
import type { Expense } from "../../entities/expense.entity";
import {
	type Transaction,
	TransactionType,
} from "../../entities/transactions.entity";
import type { TransactionModel } from "../schemas/transactions.schema";

export class TransactionsRepository {
	constructor(private model: typeof TransactionModel) {}

	async create({
		title,
		date,
		amount,
		type,
		category,
		userId, // ✅ Adicionar userId
	}: Transaction): Promise<Transaction> {
		const createdTransaction = await this.model.create({
			title,
			date,
			amount,
			type,
			category,
			userId, // ✅ Salvar com userId
		});

		return createdTransaction.toObject<Transaction>();
	}

	async index({
		title,
		categoryId,
		beginDate,
		endDate,
	}: IndexTransactionsDTO, userId: string): Promise<Transaction[]> { // ✅ Adicionar userId como parâmetro
		const whereParams: Record<string, unknown> = {
			userId, // ✅ Sempre filtrar por userId
			...(title && { title: { $regex: title, $options: "i" } }),
			...(categoryId && { "category._id": categoryId }),
		};
		if (beginDate || endDate) {
			whereParams.date = {
				...(beginDate && { $gte: beginDate }),
				...(endDate && { $lte: endDate }),
			};
		}
		const transactions = await this.model.find(whereParams, undefined, {
			sort: { date: -1 },
		});
		const transactionsMap = transactions.map((item) =>
			item.toObject<Transaction>(),
		);
		return transactionsMap;
	}

	async getBalance({ beginDate, endDate }: GetDashboardDTO, userId: string): Promise<Balance> { // ✅ Adicionar userId como parâmetro
		const aggregate = this.model.aggregate<Balance>();
		
		// ✅ Sempre filtrar por userId primeiro
		aggregate.match({ userId });
		
		if (beginDate || endDate) {
			aggregate.match({
				date: {
					...(beginDate && { $gte: beginDate }),
					...(endDate && { $lte: endDate }),
				},
			});
		}
		const [result] = await aggregate
			.project({
				_id: 0,
				income: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
				expense: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
			})
			.group({
				_id: null,
				incomes: { $sum: "$income" },
				expenses: { $sum: "$expense" },
			})
			.addFields({
				balance: { $subtract: ["$incomes", "$expenses"] },
			});

		return result;
	}

	async getExpenses({
		beginDate,
		endDate,
	}: GetDashboardDTO, userId: string): Promise<Expense[]> { // ✅ Adicionar userId como parâmetro
		const aggregate = this.model.aggregate<Expense>();
		const matchParams: Record<string, unknown> = {
			userId, // ✅ Sempre filtrar por userId
			type: TransactionType.EXPENSE,
		};
		if (beginDate || endDate) {
			matchParams.date = {
				...(beginDate && { $gte: beginDate }),
				...(endDate && { $lte: endDate }),
			};
		}
		const result = await aggregate.match(matchParams).group({
			_id: "$category._id",
			title: { $first: "$category.title" },
			color: { $first: "$category.color" },
			amount: { $sum: "$amount" },
		});
		return result;
	}

	async getFinancialEvolution(
		{ year }: GetFinancialEvolutionDTO, userId: string // ✅ Adicionar userId como parâmetro
	): Promise<Balance[]> {
		const aggregate = this.model.aggregate<Balance>();

		const result = await aggregate
			.match({
				userId, // ✅ Sempre filtrar por userId
				date: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`),
				},
			})
			.project({
				_id: 0,
				income: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
				expense: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
				year: { $year: "$date" },
				month: { $month: "$date" },
			})
			.group({
				_id: ["$year", "$month"],
				incomes: { $sum: "$income" },
				expenses: { $sum: "$expense" },
			})
			.addFields({
				balance: { $subtract: ["$incomes", "$expenses"] },
			})
			.sort({ _id: 1 });

		return result;
	}
}