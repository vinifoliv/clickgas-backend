import { Prisma, PrismaClient } from "@prisma/client";
import { ICliente } from "../interface/ICliente";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class ClienteModel {
    private readonly db: PrismaClient

    constructor(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        this.db = db;
    }

    public async criar(dados: ICliente): Promise<ICliente> {
        const cliente = await this.db.clientes.create({
            data: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                endereco: dados.endereco,
                telefone: dados.telefone,
                icone: dados.icone,
            }
        });
        return this.remodelar(cliente);
    }

    public async alterar(id: number, dados: ICliente): Promise<ICliente> {
        const cliente = await this.db.clientes.update({
            where: { id },
            data: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                endereco: dados.endereco,
                telefone: dados.telefone,
                icone: dados.icone,
            }
        });
        return this.remodelar(cliente);
    }

    public async buscar(): Promise<ICliente[]> {
        const clientes = await this.db.clientes.findMany();
        return clientes.map((cliente) => this.remodelar(cliente));
    }

    public async buscarPorId(id: number): Promise<ICliente | null> {
        const cliente = await this.db.clientes.findUnique({
            where: { id }
        });
        return cliente ? this.remodelar(cliente) : null;
    }

    public async buscarPorEmail(email: string): Promise<ICliente | null> {
        const cliente = await this.db.clientes.findUnique({
            where: { email }
        })
        if (!cliente) return null;
        return this.remodelar(cliente);
    }

    public async excluir(id: number): Promise<ICliente> {
        const cliente = await this.db.clientes.delete({ where: { id } });
        return this.remodelar(cliente);
    }

    private remodelar(cliente: {
        id: number;
        nome: string;
        email: string;
        senha: string;
        telefone: string | null;
        endereco: string | null;
        icone: string | null;
        data_cadastro: Date;
    }): ICliente {
        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            senha: cliente.senha,
            telefone: cliente.telefone,
            endereco: cliente.endereco,
            icone: cliente.icone,
            dataCadastro: cliente.data_cadastro,
        };
    }
}