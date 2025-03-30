import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionsService } from "../services/transactions.service";
import { CreateTransactionDTO, IndexTransactionsDTO } from "../dtos/transactions.dto";

export class TransactionsController {
    constructor(private transactionsSerice: TransactionsService) {}

    create = async (req: Request<unknown, unknown, CreateTransactionDTO>, res: Response, next: NextFunction) => {
        try {
            const { title, amount, categoryId, date, type } = req.body;
            const result = await this.transactionsSerice.create({title, amount, categoryId, date, type  });
            res.status(StatusCodes.CREATED).json(result); // ✅ Sem `return`
        } catch (err) {
            next(err);
        }
    };
    index = async (req: Request<unknown, unknown, unknown, IndexTransactionsDTO>, res: Response, next: NextFunction) => {
        try {
            const { title, categoryId, beginDate, endDate } = req.query;
            const result = await this.transactionsSerice.index({ title, categoryId, beginDate, endDate });
            res.status(StatusCodes.OK).json(result); // ✅ Sem `return`
        } catch (err) {
            next(err);
        }
    };
}
