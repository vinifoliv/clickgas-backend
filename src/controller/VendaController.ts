import { Express } from "express";
import { VendaModel } from "../model/VendaModel";

export class VendaController {
    constructor(
        private readonly httpServer: Express,
        private readonly vendaModel: VendaModel
    ) {
        this.httpServer.post("/vendas", async (req, res) => {
            if (!this.vendaEhValida(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }
            const venda = req.body;
            const vendaCriada = await this.vendaModel.criar(venda);
            res.status(201).json(vendaCriada);
        });

        this.httpServer.get("/vendas", async (_, res) => {
            const vendas = await vendaModel.buscar();
            res.status(200).json(vendas);
        });

        this.httpServer.get("/vendas/:id", async (req, res) => {
            const id = Number(req.params.id);
            const venda = await this.vendaModel.buscarPorId(id);
            if (!venda) {
                res.status(404).json({ message: "Venda não encontrada." });
                return;
            }
            res.status(200).json(venda);
        });

        this.httpServer.put("/vendas/:id", async (req, res) => {
            const id = Number(req.params.id);
            if (!this.vendaEhValida(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const vendaExiste = await this.vendaModel.buscarPorId(id);
            if (!vendaExiste) {
                res.status(404).json({ message: "Venda não encontrada." });
                return;
            }

            const vendaAtualizada = await this.vendaModel.atualizar(
                id,
                req.body
            );
            res.status(200).json(vendaAtualizada);
        });

        this.httpServer.delete("/vendas/:id", async (req, res) => {
            const id = Number(req.params.id);
            const vendaExiste = await vendaModel.buscarPorId(id);
            if (!vendaExiste) {
                res.status(404).json({ message: "Venda não encontrada." });
                return;
            }
            const vendaExcluida = await vendaModel.excluir(id);
            res.status(200).json(vendaExcluida);
        });
    }

    private vendaEhValida(venda: any) {
        if (!venda.fornecedorId) return false;
        if (!venda.clienteId) return false;
        if (!venda.gasId) return false;
        if (!venda.pagamentoId) return false;
        if (venda.quantidade === undefined) return false;
        if (venda.valorTotal === undefined) return false;
        return true;
    }
}
