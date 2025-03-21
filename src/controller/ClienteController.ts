import { Router } from "express";
import { ICliente } from "../interface/ICliente";

export const clienteController = Router();

clienteController.post("/clientes", async (req, res) => {
    if (!clienteValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const cliente: ICliente = montarCliente(req.body);
    const clienteExiste = await clienteRepository.buscarPorEmail(cliente.email);
    if (!clienteExiste) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }

    const clienteCriado = await clienteRepository.cadastrar(cliente);
    res.status(201).json(clienteCriado);
});

clienteController.get("/clientes/:id", async (req, res) => {
    const id = Number(req.params.id);
    const cliente = await clienteRepository.buscarPorId(id);
    if (!cliente) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }
    res.status(200).json(cliente);
});

clienteController.get("/clientes", async (_, res) => {
    const clientes = await clienteRepository.buscar();
    res.status(200).json(clientes);
});

clienteController.put("/clientes/:id", async (req, res) => {
    if (!clienteValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const id = Number(req.params.id);
    const cliente = montarCliente(req.body);
    const clienteExiste = await clienteRepository.buscarPorId(id);
    if (!clienteExiste) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }

    const existeEmail = await clienteRepository.buscarPorEmail(cliente.email);
    if (existeEmail && existeEmail.id !== id) {
        res.status(422).send("E-mail já cadastrado.");
        return;
    }

    const clienteAlterado = await clienteRepository.alterar(id, cliente);
    res.status(200).json(clienteAlterado);
});

clienteController.delete("/clientes/:id", async (req, res) => {
    const id = Number(req.params.id);
    const clienteExiste = await clienteRepository.buscarPorId(id);
    if (!clienteExiste) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }

    const clienteExcluido = await clienteRepository.excluir(id);
    res.status(200).json(clienteExcluido);
});

const clienteValido = (cliente: any): boolean => {
    if (!cliente.nome) return false;
    if (!cliente.email) return false;
    if (!cliente.senha) return false;
    if (!cliente.telefone) return false;
    if (!cliente.endereco) return false;
    if (!cliente.icone) return false;
    if (!cliente.dataNascimento) return false;
    return true;
};

const montarCliente = (body: any): ICliente => {
    return {
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        telefone: Number(body.telefone),
        endereco: body.endereco,
        icone: body.icone,
        dataNascimento: new Date(body.dataNascimento)
    };
}