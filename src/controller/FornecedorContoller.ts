import { Router } from "express";
import { IFornecedor } from "../interface/IFornecedor";

export const fornecedorController = Router();

fornecedorController.post("/fornecedores", async (req, res) => {
    if (!fornecedorValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const fornecedor = montarFornecedor(req.body);
    const fornecedorExiste = await fornecedorModel.buscarPorEmail(fornecedor.email);
    if (!fornecedorExiste) {
        res.status(404).send("Fornecedor não encontrado.");
        return;
    }

    const fornecedorCriado = await fornecedorModel.criar(fornecedor);
    res.status(201).json(fornecedorCriado);
});

fornecedorController.get("/fornecedores", async (_, res) => {
    const fornecedores = await fornecedorModel.buscar();
    res.status(200).json(fornecedores);
});

fornecedorController.get("/fornecedores/:id", async (req, res) => {
    const id = Number(req.params.id);
    const fornecedor = await fornecedorModel.buscarPorId(id);
    if (!fornecedor) {
        res.status(404).send("Fornecedor não encontrado.");
        return;
    }
    res.status(200).json(fornecedor);
});

fornecedorController.put("/fornecedores/:id", async (req, res) => {
    if (!fornecedorValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const id = Number(req.params.id);
    const fornecedor = montarFornecedor(req.body);
    const fornecedorExiste = await fornecedorModel.buscarPorId(id);
    if (!fornecedorExiste) {
        res.status(404).send("Fornecedor não encontrado.");
        return;
    }

    const fornecedorMesmoEmail = await fornecedorModel.buscarPorEmail(fornecedor.email);
    if (fornecedorMesmoEmail && fornecedorMesmoEmail.id !== id) {
        res.status(422).send("E-mail já cadastrado.");
        return;
    }

    const fornecedorAlterado = await fornecedorModel.alterar(id, fornecedor);
    res.status(200).json(fornecedorAlterado);
});

fornecedorController.delete("/fornecedores/:id", async (req, res) => {
    const id = Number(req.params.id);
    const fornecedorExiste = await fornecedorModel.buscarPorId(id);
    if (!fornecedorExiste) {
        res.status(404).send("Fornecedor não encontrado.");
        return;
    }

    const fornecedorExcluido = await fornecedorModel.excluir(id);
    res.status(200).json(fornecedorExcluido);
});

const fornecedorValido = (fornecedor: any): boolean => {
    if (!fornecedor.razaoSocial) return false;
    if (!fornecedor.email) return false;
    if (!fornecedor.telefone) return false;
    if (!fornecedor.cnpj) return false;
    if (!fornecedor.endereco) return false;
    if (!fornecedor.icone) return false;
    if (!fornecedor.dataCadastro) return false;
    return true;
};

const montarFornecedor = (body: any): IFornecedor => {
    return {
        razaoSocial: body.razaoSocial,
        email: body.email,
        telefone: Number(body.telefone),
        cnpj: Number(body.cnpj),
        endereco: body.endereco,
        icone: body.icone,
        dataCadastro: new Date(body.dataNascimento)
    };
}