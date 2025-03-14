require("dotenv").config();
import express from "express";
import cors from "cors";

import { clienteController } from "./controller/ClienteController";

const app = express();
app.use(cors());
app.use(express.json());
app.use(clienteController);

app.listen(process.env.PORT, () => {
    console.info(`Servidor rodando na porta ${process.env.PORT}...`);
});