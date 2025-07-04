import { StatusCodes } from "http-status-codes";
import type { CategoriesRepository } from "../database/repositories/categories.repository";
import type { TransactionsRepository } from "../database/repositories/transactions.repository";
import type { CreateTransactionDTO, GetDashboardDTO, GetFinancialEvolutionDTO, IndexTransactionsDTO } from "../dtos/transactions.dto";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import { Balance } from "../entities/balance.entity";
import type { Expense } from "../entities/expense.entity";

export class TransactionsService {
    constructor(private transactionsRepository: TransactionsRepository, private categoriesRepository: CategoriesRepository) { }
    
    async create({ title, amount, categoryId, date, type }: CreateTransactionDTO, userId: string): Promise<Transaction> {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category) {
            throw new AppError("Category not found", StatusCodes.NOT_FOUND);
        }
        const transaction = new Transaction({ title, amount, date, type, category, userId }); // ✅ Passando userId
        const createdTransaction = await this.transactionsRepository.create(transaction);
        return createdTransaction;
    }
    
    async index(filters: IndexTransactionsDTO, userId: string): Promise<Transaction[]> {
        const transactions = await this.transactionsRepository.index(filters, userId); // ✅ Passando userId
        return transactions;
    }
    
    async getDashboard({ beginDate, endDate }: GetDashboardDTO, userId: string): Promise<{ balance: Balance; expenses: Expense[] }> {
        let [balance, expenses] = await Promise.all([
            this.transactionsRepository.getBalance({ beginDate, endDate }, userId), // ✅ Passando userId
            this.transactionsRepository.getExpenses({ beginDate, endDate }, userId), // ✅ Passando userId
        ]);
        if (!balance) {
            balance = new Balance({ _id: null, incomes: 0, expenses: 0, balance: 0 });
        }
        return { balance, expenses };
    }
    
    async getFinancialEvolution({ year }: GetFinancialEvolutionDTO, userId: string): Promise<Balance[]> {
        const financialEvolution = await this.transactionsRepository.getFinancialEvolution({ year }, userId); // ✅ Passando userId
        return financialEvolution;
    }
}