import { Express } from "express";
import { IFornecedor } from "../interface/IFornecedor";
import { FornecedorModel } from "../model/FornecedorModel";

export class FornecedorController {
    constructor(
        private readonly httpServer: Express,
        private readonly fornecedorModel: FornecedorModel
    ) {
        this.httpServer.post("/fornecedores", async (req, res) => {
            if (!this.fornecedorValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const fornecedor = this.montarFornecedor(req.body);
            const fornecedorExiste = await this.fornecedorModel.buscarPorEmail(
                fornecedor.email
            );
            if (fornecedorExiste) {
                res.status(400).json({ message: "Fornecedor já cadastrado." });
                return;
            }

            const fornecedorCriado = await this.fornecedorModel.criar(
                fornecedor
            );
            res.status(201).json(fornecedorCriado);
        });

        this.httpServer.get("/fornecedores", async (_, res) => {
            const fornecedores = await this.fornecedorModel.buscar();
            res.status(200).json(fornecedores);
        });

        this.httpServer.get("/fornecedores/:id", async (req, res) => {
            const id = Number(req.params.id);
            const fornecedor = await this.fornecedorModel.buscarPorId(id);
            if (!fornecedor) {
                res.status(404).json({ message: "Fornecedor não encontrado." });
                return;
            }
            res.status(200).json(fornecedor);
        });

        this.httpServer.put("/fornecedores/:id", async (req, res) => {
            if (!this.fornecedorValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const id = Number(req.params.id);
            const fornecedor = this.montarFornecedor(req.body);
            const fornecedorExiste = await this.fornecedorModel.buscarPorId(id);
            if (!fornecedorExiste) {
                res.status(404).json({ message: "Fornecedor não encontrado." });
                return;
            }

            const fornecedorMesmoEmail =
                await this.fornecedorModel.buscarPorEmail(fornecedor.email);
            if (fornecedorMesmoEmail && fornecedorMesmoEmail.id !== id) {
                res.status(422).json({ message: "E-mail já cadastrado." });
                return;
            }

            const fornecedorAlterado = await this.fornecedorModel.alterar(
                id,
                fornecedor
            );
            res.status(200).json(fornecedorAlterado);
        });

        this.httpServer.delete("/fornecedores/:id", async (req, res) => {
            const id = Number(req.params.id);
            const fornecedorExiste = await this.fornecedorModel.buscarPorId(id);
            if (!fornecedorExiste) {
                res.status(404).json({ message: "Fornecedor não encontrado." });
                return;
            }

            const fornecedorExcluido = await this.fornecedorModel.excluir(id);
            res.status(200).json(fornecedorExcluido);
        });
    }

    private fornecedorValido(fornecedor: any): boolean {
        if (!fornecedor.razaoSocial) return false;
        if (!fornecedor.email) return false;
        if (!fornecedor.telefone) return false;
        if (!fornecedor.cnpj) return false;
        return true;
    }

    private montarFornecedor(body: any): IFornecedor {
        return {
            razaoSocial: body.razaoSocial,
            email: body.email,
            telefone: body.telefone,
            cnpj: body.cnpj,
            endereco: body.endereco,
            icone: body.icone,
        };
    }
}
