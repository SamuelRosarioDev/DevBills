import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import { setupMongo } from "./database";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { routes } from "./routes";
import initializeFirebaseAdmin from "./config/firebase";

initializeFirebaseAdmin();

setupMongo().then(() => {
	const app = express();
	app.use(cors({ origin: process.env.FRONT_URL }));
	app.use(json());
	app.use(routes);
	app.use(errorHandler);
	app.listen(3000, () => console.log("Servidor ativo na porta 3000"));
});
