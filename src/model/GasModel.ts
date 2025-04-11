import { PrismaClient } from "@prisma/client";
import { IGas } from "../interface/IGas";
import { Decimal } from "@prisma/client/runtime/library";

export class GasModel {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async criar(dados: IGas): Promise<IGas> {
        const gas = await this.db.gas.create({
            data: {
                nome: dados.nome,
                valor: dados.valor,
                descricao: dados.descricao,
                peso: dados.peso,
                icone: dados.icone,
            },
        });
        return this.remodelar(gas);
    }

    public async alterar(id: number, dados: IGas): Promise<IGas> {
        const gas = await this.db.gas.update({
            where: { id },
            data: {
                nome: dados.nome,
                valor: dados.valor,
                descricao: dados.descricao,
                peso: dados.peso,
                icone: dados.icone,
            },
        });
        return this.remodelar(gas);
    }

    public async buscar(): Promise<IGas[]> {
        const gases = await this.db.gas.findMany();
        return gases.map((gas) => this.remodelar(gas));
    }

    public async buscarPorId(id: number): Promise<IGas | null> {
        const gas = await this.db.gas.findUnique({
            where: { id },
        });
        if (!gas) return null;
        return this.remodelar(gas);
    }

    public async buscarPorPeso(peso: number): Promise<IGas | null> {
        const gas = await this.db.gas.findFirst({
            where: { peso },
        });
        if (!gas) return null;
        return this.remodelar(gas);
    }

    public async excluir(id: number): Promise<IGas> {
        const gas = await this.db.gas.delete({
            where: { id },
        });
        return this.remodelar(gas);
    }

    private remodelar(gas: {
        id: number;
        icone: string | null;
        data_cadastro: Date;
        nome: string;
        valor: Decimal;
        descricao: string | null;
        peso: Decimal;
    }): IGas {
        return {
            id: gas.id,
            icone: gas.icone,
            dataCadastro: gas.data_cadastro,
            nome: gas.nome,
            valor: gas.valor.toNumber(),
            descricao: gas.descricao,
            peso: gas.peso.toNumber(),
        };
    }
}
