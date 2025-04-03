import { Router } from "express";

export const gasFornecedorController = Router();

gasFornecedorController.post("/gas-fornecedores", async (req, res) => {
    if (!gasFornecedorEValido(req.body)) {
        res.status(400).send("Dados inválidos.")
        return;
    }
    const gasFornecedor = req.body;
    const gasFornecedorCriado = await gasFornecedorModel.criar(gasFornecedor);
    res.status(201).json(gasFornecedorCriado);
});

gasFornecedorController.get("/gas-fornecedores", async (_, res) => {
    const gasFornecedores = await gasFornecedorModel.buscar();
    res.status(200).json(gasFornecedores);
});

gasFornecedorController.get("/gas-fornecedores/:id", async (req, res) => {
    const id = Number(req.params.id);
    const gasFornecedor = await gasFornecedorModel.buscarPorId(id);
    if (!gasFornecedor) {
        res.status(404).send("Gás do fornecedor não encontrado.");
        return;
    }

    res.status(200).json(gasFornecedor);
});

gasFornecedorController.put("/gas-fornecedores/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!gasFornecedorEValido(req.body)) {
        res.status(400).send("Dados inválidos")
        return;
    }

    const gasFornecedorExiste = await gasFornecedorModel.buscarPorId(id);
    if (!gasFornecedorExiste) {
        res.status(404).send("Gás do fornecedor não encontrado.")
        return;
    }

    const gasFornecedorAtualizado = await gasFornecedorModel.atualizar(id);
    res.status(200).json(gasFornecedorAtualizado)
});

gasFornecedorController.delete("/gas-fornecedores/:id", async (req, res) => {
    const id = Number(req.params.id);
    const gasFornecedorExiste = await gasFornecedorModel.buscarPorId(id);
    if (!gasFornecedorExiste) {
        res.status(404).send("Gás do fornecedor não encontrado.")
        return;
    }

    const gasFornecedorExcluido = await gasFornecedorModel.excluir(id);
    res.status(200).json(gasFornecedorExcluido);
});

const gasFornecedorEValido = (gasFornecedor: any) => {
    if (!gasFornecedor.fornecedorId) return false;
    if (!gasFornecedor.gasId) return false;
    if (gasFornecedor.bloqueado === undefined) return false;
    return true;
}
