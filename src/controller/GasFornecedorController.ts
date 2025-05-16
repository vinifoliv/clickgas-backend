import { Express } from "express";
import { GasFornecedorModel } from "../model/GasFornecedorModel";

export class GasFornecedorController {
    constructor(
        private readonly httpServer: Express,
        private readonly gasFornecedorModel: GasFornecedorModel
    ) {
        this.httpServer.post("/gas-fornecedores", async (req, res) => {
            if (!this.gasFornecedorEValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }
            const gasFornecedor = req.body;
            const gasFornecedorCriado = await this.gasFornecedorModel.criar(
                gasFornecedor
            );
            res.status(201).json(gasFornecedorCriado);
        });

        this.httpServer.get("/gas-fornecedores", async (_, res) => {
            const gasFornecedores = await this.gasFornecedorModel.buscar();
            res.status(200).json(gasFornecedores);
        });

        this.httpServer.get("/gas-fornecedores/:id", async (req, res) => {
            const id = Number(req.params.id);
            const gasFornecedor = await this.gasFornecedorModel.buscarPorId(id);
            if (!gasFornecedor) {
                res.status(404).json({
                    message: "Gás do fornecedor não encontrado.",
                });
                return;
            }

            res.status(200).json(gasFornecedor);
        });

        this.httpServer.put("/gas-fornecedores/:id", async (req, res) => {
            const id = Number(req.params.id);
            if (!this.gasFornecedorEValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos" });
                return;
            }

            const gasFornecedorExiste =
                await this.gasFornecedorModel.buscarPorId(id);
            if (!gasFornecedorExiste) {
                res.status(404).json({
                    message: "Gás do fornecedor não encontrado.",
                });
                return;
            }

            const gasFornecedor = req.body;
            const gasFornecedorAtualizado =
                await this.gasFornecedorModel.atualizar(id, gasFornecedor);
            res.status(200).json(gasFornecedorAtualizado);
        });

        this.httpServer.delete("/gas-fornecedores/:id", async (req, res) => {
            const id = Number(req.params.id);
            const gasFornecedorExiste =
                await this.gasFornecedorModel.buscarPorId(id);
            if (!gasFornecedorExiste) {
                res.status(404).json({
                    message: "Gás do fornecedor não encontrado.",
                });
                return;
            }

            const gasFornecedorExcluido = await gasFornecedorModel.excluir(id);
            res.status(200).json(gasFornecedorExcluido);
        });
    }

    private gasFornecedorEValido(gasFornecedor: any): boolean {
        if (!gasFornecedor.fornecedorId) return false;
        if (!gasFornecedor.gasId) return false;
        if (gasFornecedor.bloqueado === undefined) return false;
        return true;
    }
}
