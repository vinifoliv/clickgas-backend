import { PrismaClient } from "@prisma/client";
import { IFornecedor } from "../interface/IFornecedor";

export class FornecedorModel {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async criar(dados: IFornecedor): Promise<IFornecedor> {
        const fornecedor = await this.db.fornecedor.create({
            data: {
                cnpj: dados.cnpj,
                email: dados.email,
                razao_social: dados.razaoSocial,
                telefone: dados.telefone,
                endereco: dados.endereco,
                icone: dados.icone,
            },
        });
        return this.remodelar(fornecedor);
    }

    public async alterar(id: number, dados: IFornecedor): Promise<IFornecedor> {
        const fornecedor = await this.db.fornecedor.update({
            where: { id },
            data: {
                cnpj: dados.cnpj,
                email: dados.email,
                razao_social: dados.razaoSocial,
                telefone: dados.telefone,
                endereco: dados.endereco,
                icone: dados.icone,
            },
        });
        return this.remodelar(fornecedor);
    }

    public async buscar(): Promise<IFornecedor[]> {
        const fornecedores = await this.db.fornecedor.findMany();
        return fornecedores.map((fornecedor) => this.remodelar(fornecedor));
    }

    public async buscarPorId(id: number): Promise<IFornecedor | null> {
        const fornecedor = await this.db.fornecedor.findUnique({
            where: { id },
        });
        if (!fornecedor) return null;
        return this.remodelar(fornecedor);
    }

    public async buscarPorEmail(email: string): Promise<IFornecedor | null> {
        const fornecedor = await this.db.fornecedor.findUnique({
            where: { email },
        });
        if (!fornecedor) return null;
        return this.remodelar(fornecedor);
    }

    public async excluir(id: number): Promise<IFornecedor> {
        const fornecedor = await this.db.fornecedor.delete({
            where: { id },
        });
        return this.remodelar(fornecedor);
    }

    private remodelar(fornecedor: {
        id: number;
        razao_social: string;
        email: string;
        telefone: string;
        cnpj: string;
        endereco: string | null;
        icone: string | null;
        data_cadastro: Date;
    }): IFornecedor {
        return {
            id: fornecedor.id,
            razaoSocial: fornecedor.razao_social,
            email: fornecedor.email,
            telefone: fornecedor.telefone,
            cnpj: fornecedor.cnpj,
            endereco: fornecedor.endereco,
            icone: fornecedor.icone,
            dataCadastro: fornecedor.data_cadastro,
        };
    }
}
