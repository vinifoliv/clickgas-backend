import { Router } from "express";

export const vendaController = Router();

vendaController.post("/vendas", async (req, res) => {
    if (!vendaEhValida(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }
    const venda = req.body;
    const vendaCriada = await vendaModel.criar(venda);
    res.status(201).json(vendaCriada);
});

vendaController.get("/vendas", async (_, res) => {
    const vendas = await vendaModel.buscar();
    res.status(200).json(vendas);
});

vendaController.get("/vendas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const venda = await vendaModel.buscarPorId(id);
    if (!venda) {
        res.status(404).send("Venda não encontrada.");
        return;
    }
    res.status(200).json(venda);
});

vendaController.put("/vendas/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!vendaEhValida(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const vendaExiste = await vendaModel.buscarPorId(id);
    if (!vendaExiste) {
        res.status(404).send("Venda não encontrada.");
        return;
    }

    const vendaAtualizada = await vendaModel.atualizar(id);
    res.status(200).json(vendaAtualizada);
});

vendaController.delete("/vendas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const vendaExiste = await vendaModel.buscarPorId(id);
    if (!vendaExiste) {
        res.status(404).send("Venda não encontrada.");
        return;
    }
    const vendaExcluida = await vendaModel.excluir();
    res.status(200).json(vendaExcluida);
});

const vendaEhValida = (venda: any) => {
    if (!venda.fornecedorId) return false;
    if (!venda.clienteId) return false;
    if (!venda.gasId) return false;
    if (!venda.formaPagamentoId) return false;
    if (venda.quantidade === undefined) return false;
    if (venda.valorTotal === undefined) return false;
    return true;
}
