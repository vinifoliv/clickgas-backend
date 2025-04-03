import { Router } from "express";

export const avaliacaoFornecedorController = Router();

avaliacaoFornecedorController.post("/avaliacoes-fornecedor", async (req, res) => {
  if (!fornecedorValido(req.body)) {
    res.status(400).send("Dados inválidos.");
    return;
  }
  const avaliacao = montarAvaliacaoFornecedor(req.body);
  const avaliacaoCriada = await avaliacaoFornecedorModel.criar(avaliacao);
  res.status(200).json(avaliacaoCriada);
});

avaliacaoFornecedorController.get("/avaliacoes-fornecedor", async (_, res) => {
  const avaliacoes = await avaliacaoFornecedorModel.buscar();
  res.status(200).json(avaliacoes);
});

avaliacaoFornecedorController.get("/avaliacoes-fornecedor/:id", async (req, res) => {
  const id = Number(req.params.id);
  const avaliacao = await avaliacaoFornecedorModel.buscarPorId(id);
  if (!avaliacao) {
    res.status(404).send("Avaliação não encontrada.");
    return;
  }
  res.status(200).json(avaliacao);
});

avaliacaoFornecedorController.put("/avaliacoes-fornecedor/:id", async (req, res) => {
  if (!fornecedorValido(req.body)) {
    res.status(400).send("Dados inválidos.");
    return;
  }

  const id = Number(req.params.id);
  const avaliacao = montarAvaliacaoFornecedor(req.body);
  const avaliacaoExiste = await avaliacaoFornecedorModel.buscarPorId(id);
  if (!avaliacaoExiste) {
    res.status(404).send("Avaliação não encontrada.");
    return;
  }

  const avaliacaoMesmoFornecedor = await avaliacaoFornecedorModel.buscarPorClienteIdEFornecedorId(avaliacao.clienteId, avaliacao.fornecedorId);
  if (avaliacaoMesmoFornecedor && avaliacaoMesmoFornecedor.id !== id) {
    res.status(409).send("Avaliação para esse fornecedor já existe.");
    return;
  }
  const avaliacaoAtualizada = await avaliacaoFornecedorModel.atualizar(avaliacao);
  res.status(200).json(avaliacaoAtualizada);
});

avaliacaoFornecedorController.delete("/avaliacoes-fornecedor/:id", async (req, res) => {
  const id = Number(req.params.id);
  const avaliacaoExiste = await avaliacaoFornecedorModel.buscarPorId(id);
  if (!avaliacaoExiste) {
    res.status(404).send("Avaliação não encontrada.");
    return;
  }

  const avaliacaoExcluida = await avaliacaoFornecedorModel.excluir(id);
  res.status(200).json(avaliacaoExcluida);
});


const montarAvaliacaoFornecedor = (avaliacao: any) => {
  const avaliacaoMontada: IAvaliacaoFornecedor = {
    fornecedorId: avaliacao.fornecedorId,
    clienteId: avaliacao.clienteId,
    avaliacao: avaliacao.avaliacao
  }
  return avaliacaoMontada;
}

export interface IAvaliacaoFornecedor {
  readonly fornecedorId: number;
  readonly clienteId: number;
  readonly avaliacao: number;
}

const fornecedorValido = (fornecedor: any): boolean => {
  if (fornecedor.fornecedorId === undefined) return false;
  if (fornecedor.clienteId === undefined) return false;
  if (fornecedor.avaliacaoId === undefined) return false;
  return true;
};
