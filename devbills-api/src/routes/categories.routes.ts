import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post("/", async (req, res) => {
	try {
		await controller.create(req, res);
	} catch (error) {
		res.status(500).json({ message: "Erro ao criar categoria", error });
	}
});
