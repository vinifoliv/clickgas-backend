require("dotenv").config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import { ClienteController } from "./controller/ClienteController";
import { FormaPagamentoController } from "./controller/FormaPagamentoController";
import { GasController } from "./controller/GasController";
import { GasFornecedorController } from "./controller/GasFornecedorController";
import { AvaliacaoFornecedorController } from "./controller/AvaliacaoFornecedorController";
import { ClienteModel } from "./model/ClienteModel";
import { prisma } from "./database/prismaClient";
import { FornecedorModel } from "./model/FornecedorModel";
import { GasModel } from "./model/GasModel";
import { GasFornecedorModel } from "./model/GasFornecedorModel";
import { AvaliacaoFornecedorModel } from "./model/AvaliacaoModel";
import { FormaPagamentoModel } from "./model/FormaPagamentoModel";
import { FornecedorController } from "./controller/FornecedorController";
import { VendaController } from "./controller/VendaController";
import { VendaModel } from "./model/VendaModel";

const avaliacaoFornecedorModel = new AvaliacaoFornecedorModel(prisma);
const clienteModel = new ClienteModel(prisma);
const formaPagamentoModel = new FormaPagamentoModel(prisma);
const fornecedorModel = new FornecedorModel(prisma);
const gasFornecedorModel = new GasFornecedorModel(prisma);
const gasModel = new GasModel(prisma);
const vendaModel = new VendaModel(prisma);

const app = express();
app.use(cors());
app.use(express.json());

new ClienteController(app, clienteModel);
new FormaPagamentoController(app, formaPagamentoModel);
new FornecedorController(app, fornecedorModel);
new GasFornecedorController(app, gasFornecedorModel);
new GasController(app, gasModel);
new AvaliacaoFornecedorController(app, avaliacaoFornecedorModel);
new VendaController(app, vendaModel);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.info(`Servidor rodando na porta ${process.env.PORT}...`);
});
