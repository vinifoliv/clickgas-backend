import { Router } from "express";
import { IFornecedor } from "../interface/IFornecedor";

export const fornecedorController = Router();

fornecedorController.post("/fornecedores", async (req, res) => {
    if (!fornecedorValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }
    
    // const fornecedor: IFornecedor = montarFornecedor(req.body);
    // const fornecedorExiste = await clienteRepository.buscarPorEmail(fornecedor.email);
    // if (!fornecedorExiste) {
    //     res.status(404).send("fornecedor não encontrado.");
    //     return;
    // }

    // const fornecedorCriado = await clienteRepository.cadastrar(fornecedor);
    // res.status(201).json(fornecedorCriado);
});

fornecedorController.get("/fornecedores", async (_, res) => {
    // const fornecedores = await clienteRepository.buscar();
    // res.status(200).json(fornecedores);
});

fornecedorController.put("/fornecedores/:id", async (req, res) => {
    if (!fornecedorValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    // const id = Number(req.params.id);
    // const fornecedor: IFornecedor = montarFornecedor(req.body);
    // const fornecedorExiste = await clienteRepository.buscarPorId(id);
    // if (!fornecedorExiste) {
    //     res.status(404).send("fornecedor não encontrado.");
    //     return;
    // }

    // const existeEmail = await clienteRepository.buscarPorEmail(fornecedor.email);
    // if (existeEmail && existeEmail.id !== id) {
    //     res.status(422).send("E-mail já cadastrado.");
    //     return;
    // }

    // const fornecedorAlterado = await clienteRepository.alterar(id, fornecedor);
    // res.status(200).json(fornecedorAlterado);
});

fornecedorController.delete("/fornecedores/:id", async (req, res) => {
    // const id = Number(req.params.id);
    // const fornecedorExiste = await clienteRepository.buscarPorId(id);
    // if (!fornecedorControllerExiste) {
    //     res.status(404).send("Fornecedor não encontrado.");
    //     return;
    // }

    // const fornecedorExcluido = await clienteRepository.excluir(id);
    // res.status(200).json(fornecedorExcluido);
});

const fornecedorValido = (cliente: any): boolean => {
    if (!cliente.razaoSocial) return false;
    if (!cliente.email) return false;
    if (!cliente.telefone) return false;
    if (!cliente.cnpj) return false;
    if (!cliente.endereco) return false;
    if (!cliente.icone) return false;
    if (!cliente.dataCadastro) return false;
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