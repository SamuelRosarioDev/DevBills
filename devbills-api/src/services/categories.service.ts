import { Category } from "../entities/category.entity";

export class CategoriesService {
	async create(): Promise<Category> {
		const category = new Category({
			title: "Exemplo Category",
			color: "#teste",
		});

		return category;
	}
}
