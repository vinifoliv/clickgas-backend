import { Express } from "express";
import { ICliente } from "../interface/ICliente";
import { ClienteModel } from "../model/ClienteModel";

export class ClienteController {
    constructor(
        private readonly httpServer: Express,
        private readonly clienteModel: ClienteModel
    ) {
        this.httpServer.post("/clientes", async (req, res) => {
            if (!this.clienteValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const cliente = this.montarCliente(req.body);
            const clienteExiste = await this.clienteModel.buscarPorEmail(
                cliente.email
            );
            if (clienteExiste) {
                res.status(400).json({ message: "Cliente já cadastrado ." });
                return;
            }

            const clienteCriado = await this.clienteModel.criar(cliente);
            res.status(201).json(clienteCriado);
        });

        this.httpServer.get("/clientes/:id", async (req, res) => {
            const id = Number(req.params.id);
            const cliente = await this.clienteModel.buscarPorId(id);
            if (!cliente) {
                res.status(404).json({ message: "Cliente não encontrado." });
                return;
            }
            res.status(200).json(cliente);
        });

        this.httpServer.get("/clientes", async (_, res) => {
            const clientes = await this.clienteModel.buscar();
            res.status(200).json(clientes);
        });

        this.httpServer.put("/clientes/:id", async (req, res) => {
            if (!this.clienteValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const id = Number(req.params.id);
            const cliente = this.montarCliente(req.body);
            const clienteExiste = await this.clienteModel.buscarPorId(id);
            if (!clienteExiste) {
                res.status(404).json({ message: "Cliente não encontrado." });
                return;
            }

            const existeEmail = await clienteModel.buscarPorEmail(
                cliente.email
            );
            if (existeEmail && existeEmail.id !== id) {
                res.status(422).json({ message: "E-mail já cadastrado." });
                return;
            }

            const clienteAlterado = await this.clienteModel.alterar(
                id,
                cliente
            );
            res.status(200).json(clienteAlterado);
        });

        this.httpServer.delete("/clientes/:id", async (req, res) => {
            const id = Number(req.params.id);
            const clienteExiste = await this.clienteModel.buscarPorId(id);
            if (!clienteExiste) {
                res.status(404).json({ message: "Cliente não encontrado." });
                return;
            }

            const clienteExcluido = await this.clienteModel.excluir(id);
            res.status(200).json(clienteExcluido);
        });
    }

    private clienteValido(cliente: any): boolean {
        if (!cliente.nome) return false;
        if (!cliente.email) return false;
        if (!cliente.senha) return false;
        return true;
    }

    private montarCliente(body: any): ICliente {
        return {
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            telefone: body.telefone || null,
            endereco: body.endereco || null,
            icone: body.icone || null,
        };
    }
}
