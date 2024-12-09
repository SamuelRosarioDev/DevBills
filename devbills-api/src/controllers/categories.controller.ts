import type { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";

export class CategoriesController {
	async create(req: Request, res: Response): Promise<Response> {
		const service = new CategoriesService();
		const result = await service.create();
		return res.status(201).json(result);
	}
}