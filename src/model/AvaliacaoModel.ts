import { PrismaClient } from "@prisma/client";
import { IAvaliacaoFornecedor } from "../interface/IAvaliacaoFornecedor";
import { Decimal } from "@prisma/client/runtime/library";

export class AvaliacaoFornecedorModel {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async criar(
        dados: IAvaliacaoFornecedor
    ): Promise<IAvaliacaoFornecedor> {
        const avaliacao = await this.db.avaliacoes_fornecedor.create({
            data: {
                avaliacao: dados.avaliacao,
                id_fornecedor: dados.fornecedorId,
                id_clientes: dados.clienteId,
            },
        });
        return this.remodelar(avaliacao);
    }

    public async atualizar(
        id: number,
        dados: IAvaliacaoFornecedor
    ): Promise<IAvaliacaoFornecedor> {
        const avaliacao = await this.db.avaliacoes_fornecedor.update({
            where: { id },
            data: {
                avaliacao: dados.avaliacao,
                id_fornecedor: dados.fornecedorId,
                id_clientes: dados.clienteId,
            },
        });
        return this.remodelar(avaliacao);
    }

    public async buscar(): Promise<IAvaliacaoFornecedor[]> {
        const avaliacao = await this.db.avaliacoes_fornecedor.findMany();
        return avaliacao.map((avaliacao) => this.remodelar(avaliacao));
    }

    public async buscarPorId(id: number): Promise<IAvaliacaoFornecedor | null> {
        const avaliacao = await this.db.avaliacoes_fornecedor.findUnique({
            where: { id },
        });
        return avaliacao ? this.remodelar(avaliacao) : null;
    }

    public async buscarPorClienteIdEFornecedorId(
        clienteId: number,
        fornecedorId: number
    ): Promise<IAvaliacaoFornecedor | null> {
        const avaliacao = await this.db.avaliacoes_fornecedor.findFirst({
            where: { id_clientes: clienteId, id_fornecedor: fornecedorId },
        });
        return avaliacao ? this.remodelar(avaliacao) : null;
    }

    public async buscarPorAvaliacao(
        avaliacao: number
    ): Promise<IAvaliacaoFornecedor[]> {
        const avaliacoes = await this.db.avaliacoes_fornecedor.findMany({
            where: { avaliacao },
        });
        return avaliacoes.map((avaliacao) => this.remodelar(avaliacao));
    }

    public async excluir(id: number): Promise<IAvaliacaoFornecedor> {
        const avaliacao = await this.db.avaliacoes_fornecedor.delete({
            where: { id },
        });
        return this.remodelar(avaliacao);
    }

    private remodelar(avaliacao: {
        id: number;
        avaliacao: Decimal | null;
        data_cadastro: Date;
        id_fornecedor: number | null;
        id_clientes: number | null;
    }): IAvaliacaoFornecedor {
        return {
            id: avaliacao.id,
            avaliacao: avaliacao.avaliacao?.toNumber() || 0,
            fornecedorId: avaliacao.id_fornecedor!,
            clienteId: avaliacao.id_clientes!,
        };
    }
}
