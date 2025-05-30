import type { NextFunction, Request, Response } from "express";
import type { CategoriesService } from "../services/categories.service";

import type { CreateCategoryDTO } from "../dtos/categories.dto";
import { StatusCodes } from "http-status-codes";

export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	create = async (req: Request<unknown, unknown, CreateCategoryDTO>, res: Response, next: NextFunction) => {
		try {
			const { title, color } = req.body;
			const result = await this.categoriesService.create({ title, color });
			res.status(StatusCodes.CREATED).json(result); 
		} catch (err) {
			next(err);
		}
	};

	index = async (_: Request, res: Response, next: NextFunction) => {
		try {
			const result = await this.categoriesService.index();
			res.status(StatusCodes.OK).json(result); 
		} catch (err) {
			next(err);
		}
	};
}
