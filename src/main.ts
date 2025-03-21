require("dotenv").config();
import express from "express";
import cors from "cors";

import { clienteController } from "./controller/ClienteController";
import { formaPagamentoController } from "./controller/FormaPagamentoController";
import { fornecedorController } from "./controller/FornecedorContoller";
import { gasController } from "./controller/GasController";
import { gasFornecedorController } from "./controller/GasFornecedorController";
import { avaliacaoFornecedorController } from "./controller/AvaliacaoFornecedor";
import { vendaController } from "./controller/VendaController";

const app = express();
app.use(cors());
app.use(express.json());
app.use(clienteController);
app.use(formaPagamentoController);
app.use(fornecedorController);
app.use(gasController);
app.use(gasFornecedorController);
app.use(avaliacaoFornecedorController);
app.use(vendaController);

app.listen(process.env.PORT, () => {
    console.info(`Servidor rodando na porta ${process.env.PORT}...`);
});