import { Router } from "express";
import { IFormaPagamento } from "../interface/IFormaPagamento";

export const formaPagamentoController = Router();

formaPagamentoController.post("/formaPagamento", async (req, res) => {
    if (!formaValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }
    
    // const formaPagamento: IFormaPagamento = montarPagamento(req.body);
    // const pagamentoExiste = await clienteRepository.buscarPorEmail(formaPagamento.nome);
    // if (!pagamentoExiste) {
    //     res.status(404).send("Forma de pagamento não encontrado.");
    //     return;
    // }

});

formaPagamentoController.get("/formaPagamento", async (_, res) => {
    // const formPagamentos = await clienteRepository.buscar();
    // res.status(200).json(formPagamentos);
});

formaPagamentoController.put("/formaPagamento/:id", async (req, res) => {
    if (!formaValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    // const id = Number(req.params.id);
    // const formaPagamento: IFormaPagamento = montarPagamento(req.body);
    // const pagamentoExiste = await clienteRepository.buscarPorId(id);
    // if (!pagamentoExiste) {
    //     res.status(404).send("Forma de pagamento não encontrado.");
    //     return;
    // }

    // const existeNome = await clienteRepository.buscarPorEmail(formaPagamento.nome);
    // if (existeNome && existeNome.id !== id) {
    //     res.status(422).send("Forma de pagamento já cadastrado.");
    //     return;
    // }

    // const pagamentoAlterado = await clienteRepository.alterar(id, formaPagamento);
    // res.status(200).json(pagamentoAlterado);
});

formaPagamentoController.delete("/formaPagamento/:id", async (req, res) => {
    // const id = Number(req.params.id);
    // const pagamentoExiste = await clienteRepository.buscarPorId(id);
    // if (!pagamentoExiste) {
    //     res.status(404).send("Forma de pagamento não encontrado.");
    //     return;
    // }

    // const pagamentoExcluido = await clienteRepository.excluir(id);
    // res.status(200).json(pagamentoExcluido);
});

const formaValido = (cliente: any): boolean => {
    if (!cliente.nome) return false;
    if (!cliente.icone) return false;
    return true;
};

const montarPagamento = (body: any): IFormaPagamento => {
    return {
        nome: body.nome,
        icone: body.icone
    };
}