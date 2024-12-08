import express, { json } from "express";

const app = express();

app.use(json());

app.listen(3333, () => console.log("Servidor ativo na porta 3333"));
