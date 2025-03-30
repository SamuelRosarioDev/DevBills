import { GetFinancialEvolutionDTO, getFinancialEvolutionSchema } from './../dtos/transactions.dto';
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionsService } from "../services/transactions.service";
import { CreateTransactionDTO, GetDashboardDTO, IndexTransactionsDTO } from "../dtos/transactions.dto";
import { BodyRequest, QueryRequest } from "./types";

export class TransactionsController {
    constructor(private transactionsSerice: TransactionsService) {}

    create = async (req: BodyRequest< CreateTransactionDTO>, res: Response, next: NextFunction) => {
        try {
            const { title, amount, categoryId, date, type } = req.body;
            const result = await this.transactionsSerice.create({title, amount, categoryId, date, type  });
            res.status(StatusCodes.CREATED).json(result); // ✅ Sem `return`
        } catch (err) {
            next(err);
        }
    };
    index = async (req: QueryRequest< IndexTransactionsDTO>, res: Response, next: NextFunction) => {
        try {
            const { title, categoryId, beginDate, endDate } = req.query;
            const result = await this.transactionsSerice.index({ title, categoryId, beginDate, endDate });
            res.status(StatusCodes.OK).json(result); // ✅ Sem `return`
        } catch (err) {
            next(err);
        }
    };
    getDashboard = async (req: QueryRequest< GetDashboardDTO>, res: Response, next: NextFunction) => {
        try {
            const { beginDate, endDate } = req.query;
            const result = await this.transactionsSerice.getDashboard({ beginDate, endDate });
            res.status(StatusCodes.OK).json(result); // ✅ Sem `return`
        } catch (err) {
            next(err);
        }
    };

    getFinancialEvolution = async (req: QueryRequest< GetFinancialEvolutionDTO>, res: Response, next: NextFunction) => {
        try {
            const { year } = req.query;
            const result = await this.transactionsSerice.getFinancialEvolution({ year });
            res.status(StatusCodes.OK).json(result); // ✅ Sem `return`
        } catch (err) {
            next(err);
        }
    };
}
