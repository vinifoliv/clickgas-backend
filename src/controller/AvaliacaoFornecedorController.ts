import { Express } from "express";
import { AvaliacaoFornecedorModel } from "../model/AvaliacaoModel";
import { IAvaliacaoFornecedor } from "../interface/IAvaliacaoFornecedor";

export class AvaliacaoFornecedorController {
    constructor(
        private readonly httpServer: Express,
        private readonly avaliacaoFornecedorModel: AvaliacaoFornecedorModel
    ) {
        this.httpServer.post("/avaliacoes-fornecedor", async (req, res) => {
            if (!this.fornecedorValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }
            const avaliacao = this.montarAvaliacaoFornecedor(req.body);
            const avaliacaoCriada = await this.avaliacaoFornecedorModel.criar(
                avaliacao
            );
            res.status(200).json(avaliacaoCriada);
        });

        this.httpServer.get("/avaliacoes-fornecedor", async (_, res) => {
            const avaliacoes = await this.avaliacaoFornecedorModel.buscar();
            res.status(200).json(avaliacoes);
        });

        this.httpServer.get("/avaliacoes-fornecedor/:id", async (req, res) => {
            const id = Number(req.params.id);
            const avaliacao = await this.avaliacaoFornecedorModel.buscarPorId(
                id
            );
            if (!avaliacao) {
                res.status(404).json({ message: "Avaliação não encontrada." });
                return;
            }
            res.status(200).json(avaliacao);
        });

        this.httpServer.put("/avaliacoes-fornecedor/:id", async (req, res) => {
            if (!this.fornecedorValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const id = Number(req.params.id);
            const avaliacao = this.montarAvaliacaoFornecedor(req.body);
            const avaliacaoExiste =
                await this.avaliacaoFornecedorModel.buscarPorId(id);
            if (!avaliacaoExiste) {
                res.status(404).json({ message: "Avaliação não encontrada." });
                return;
            }

            const avaliacaoMesmoFornecedor =
                await this.avaliacaoFornecedorModel.buscarPorClienteIdEFornecedorId(
                    avaliacao.clienteId,
                    avaliacao.fornecedorId
                );
            if (
                avaliacaoMesmoFornecedor &&
                avaliacaoMesmoFornecedor.id !== id
            ) {
                res.status(409).json({
                    message: "Avaliação para esse fornecedor já existe.",
                });
                return;
            }
            const avaliacaoAtualizada =
                await this.avaliacaoFornecedorModel.atualizar(id, avaliacao);
            res.status(200).json(avaliacaoAtualizada);
        });

        this.httpServer.delete(
            "/avaliacoes-fornecedor/:id",
            async (req, res) => {
                const id = Number(req.params.id);
                const avaliacaoExiste =
                    await this.avaliacaoFornecedorModel.buscarPorId(id);
                if (!avaliacaoExiste) {
                    res.status(404).json({
                        message: "Avaliação não encontrada.",
                    });
                    return;
                }

                const avaliacaoExcluida =
                    await avaliacaoFornecedorModel.excluir(id);
                res.status(200).json(avaliacaoExcluida);
            }
        );
    }

    private montarAvaliacaoFornecedor(avaliacao: any) {
        const avaliacaoMontada: IAvaliacaoFornecedor = {
            fornecedorId: avaliacao.fornecedorId,
            clienteId: avaliacao.clienteId,
            avaliacao: avaliacao.avaliacao,
        };
        return avaliacaoMontada;
    }

    private fornecedorValido(fornecedor: any): boolean {
        if (fornecedor.fornecedorId === undefined) return false;
        if (fornecedor.clienteId === undefined) return false;
        if (fornecedor.avaliacaoId === undefined) return false;
        return true;
    }
}
