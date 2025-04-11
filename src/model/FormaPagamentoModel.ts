import { PrismaClient } from "@prisma/client";
import { IFormaPagamento } from "../interface/IFormaPagamento";

export class FormaPagamentoModel {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async criar(dados: IFormaPagamento): Promise<IFormaPagamento> {
        const formaPagamento = await this.db.forma_pagamento.create({
            data: {
                nome: dados.nome,
                icone: dados.icone,
            },
        });
        return this.remodelar(formaPagamento);
    }

    public async alterar(
        id: number,
        dados: IFormaPagamento
    ): Promise<IFormaPagamento> {
        const formaPagamento = await this.db.forma_pagamento.update({
            where: { id },
            data: {
                nome: dados.nome,
                icone: dados.icone,
            },
        });
        return this.remodelar(formaPagamento);
    }

    public async buscar(): Promise<IFormaPagamento[]> {
        const formaPagamentos = await this.db.forma_pagamento.findMany();
        return formaPagamentos.map((formaPagamento) =>
            this.remodelar(formaPagamento)
        );
    }

    public async buscarPorId(id: number): Promise<IFormaPagamento | null> {
        const formaPagamento = await this.db.forma_pagamento.findUnique({
            where: { id },
        });
        if (!formaPagamento) return null;
        return this.remodelar(formaPagamento);
    }

    public async buscarPorNome(nome: string): Promise<IFormaPagamento | null> {
        const formaPagamento = await this.db.forma_pagamento.findFirst({
            where: { nome },
        });
        if (!formaPagamento) return null;
        return this.remodelar(formaPagamento);
    }

    public async excluir(id: number): Promise<IFormaPagamento> {
        const formaPagamento = await this.db.forma_pagamento.delete({
            where: { id },
        });
        return this.remodelar(formaPagamento);
    }

    private remodelar(formaPagamento: {
        id: number;
        nome: string;
        icone: string | null;
    }): IFormaPagamento {
        return {
            id: formaPagamento.id,
            nome: formaPagamento.nome,
            icone: formaPagamento.icone,
        };
    }
}
