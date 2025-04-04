import { Router } from "express";
import { ICliente } from "../interface/ICliente";
import { clienteModel } from "../main";

const clienteController = Router();

clienteController.post("/clientes", async (req, res) => {
    if (!clienteValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const cliente = montarCliente(req.body);
    const clienteExiste = await clienteModel.buscarPorEmail(cliente.email);
    if (clienteExiste) {
        res.status(400).send("Cliente já cadastrado .");
        return;
    }

    const clienteCriado = await clienteModel.criar(cliente);
    res.status(201).json(clienteCriado);
});

clienteController.get("/clientes/:id", async (req, res) => {
    const id = Number(req.params.id);
    const cliente = await clienteModel.buscarPorId(id);
    if (!cliente) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }
    res.status(200).json(cliente);
});

clienteController.get("/clientes", async (_, res) => {
    const clientes = await clienteModel.buscar();
    res.status(200).json(clientes);
});

clienteController.put("/clientes/:id", async (req, res) => {
    if (!clienteValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const id = Number(req.params.id);
    const cliente = montarCliente(req.body);
    const clienteExiste = await clienteModel.buscarPorId(id);
    if (!clienteExiste) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }

    const existeEmail = await clienteModel.buscarPorEmail(cliente.email);
    if (existeEmail && existeEmail.id !== id) {
        res.status(422).send("E-mail já cadastrado.");
        return;
    }

    const clienteAlterado = await clienteModel.alterar(id, cliente);
    res.status(200).json(clienteAlterado);
});

clienteController.delete("/clientes/:id", async (req, res) => {
    const id = Number(req.params.id);
    const clienteExiste = await clienteModel.buscarPorId(id);
    if (!clienteExiste) {
        res.status(404).send("Cliente não encontrado.");
        return;
    }

    const clienteExcluido = await clienteModel.excluir(id);
    res.status(200).json(clienteExcluido);
});

const clienteValido = (cliente: any): boolean => {
    if (!cliente.nome) return false;
    if (!cliente.email) return false;
    if (!cliente.senha) return false;
    return true;
};

const montarCliente = (body: any): ICliente => {
    return {
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        telefone: body.telefone || null,
        endereco: body.endereco || null,
        icone: body.icone || null,
    };
}

export { clienteController };
