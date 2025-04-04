require("dotenv").config();
import express from "express";
import cors from "cors";

import { clienteController } from "./controller/ClienteController";
import { formaPagamentoController } from "./controller/FormaPagamentoController";
import { gasController } from "./controller/GasController";
import { gasFornecedorController } from "./controller/GasFornecedorController";
import { avaliacaoFornecedorController } from "./controller/AvaliacaoFornecedor";
import { vendaController } from "./controller/VendaController";
import { ClienteModel } from "./model/ClienteModel";
import { prisma } from "./database/prismaClient";
import { FornecedorModel } from "./model/FornecedorModel";
import { GasModel } from "./model/GasModel";
import { fornecedorController } from "./controller/fornecedorController";

export const clienteModel = new ClienteModel(prisma);
export const fornecedorModel = new FornecedorModel(prisma);
export const gasModel = new GasModel(prisma);

const app = express();
app.use(cors());
app.use(express.json());
app.use(clienteController);
// app.use(formaPagamentoController);
app.use(fornecedorController);
app.use(gasController);
// app.use(gasFornecedorController);
// app.use(avaliacaoFornecedorController);
// app.use(vendaController);

app.listen(process.env.PORT, () => {
    console.info(`Servidor rodando na porta ${process.env.PORT}...`);
});