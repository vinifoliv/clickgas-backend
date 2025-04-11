import { PrismaClient } from "@prisma/client";
import { IVenda } from "../interface/IVenda";
import { Decimal } from "@prisma/client/runtime/library";

export class VendaModel {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async criar(dados: IVenda): Promise<IVenda> {
        const venda = await this.db.venda.create({
            data: {
                id_fornecedor: dados.fornecedorId,
                id_clientes: dados.clienteId,
                id_gas: dados.gasId,
                id_pagamento: dados.pagamentoId,
                quantidade: dados.quantidade,
                valor_total: dados.valorTotal,
            },
        });
        return this.remodelar(venda);
    }

    public async atualizar(id: number, dados: IVenda): Promise<IVenda> {
        const venda = await this.db.venda.update({
            where: { id },
            data: {
                id_fornecedor: dados.fornecedorId,
                id_clientes: dados.clienteId,
                id_gas: dados.gasId,
                id_pagamento: dados.pagamentoId,
                quantidade: dados.quantidade,
                valor_total: dados.valorTotal,
            },
        });
        return this.remodelar(venda);
    }

    public async buscar(): Promise<IVenda[]> {
        const vendas = await this.db.venda.findMany();
        return vendas.map((venda) => this.remodelar(venda));
    }

    public async buscarPorId(id: number): Promise<IVenda | null> {
        const venda = await this.db.venda.findUnique({
            where: { id },
        });
        if (!venda) return null;
        return this.remodelar(venda);
    }

    public async excluir(id: number): Promise<IVenda> {
        const venda = await this.db.venda.delete({
            where: { id },
        });
        return this.remodelar(venda);
    }

    private remodelar(venda: {
        id: number;
        quantidade: number;
        valor_total: Decimal;
        data_cadastro: Date;
        id_fornecedor: number | null;
        id_clientes: number | null;
        id_gas: number | null;
        id_pagamento: number | null;
    }): IVenda {
        return {
            id: venda.id,
            fornecedorId: venda.id_fornecedor,
            clienteId: venda.id_clientes,
            gasId: venda.id_gas,
            pagamentoId: venda.id_pagamento,
            quantidade: venda.quantidade,
            valorTotal: venda.valor_total.toNumber(),
            dataCadastro: venda.data_cadastro,
        };
    }
}
