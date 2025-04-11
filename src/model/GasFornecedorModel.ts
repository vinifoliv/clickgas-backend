import { PrismaClient } from "@prisma/client";
import { IGasFornecedor } from "../interface/IGasFornecedor";

export class GasFornecedorModel {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async criar(dados: IGasFornecedor): Promise<IGasFornecedor> {
        const gasFornecedor = await this.db.gas_fornecedor.create({
            data: {
                id_fornecedor: dados.fornecedorId,
                id_gas: dados.gasId,
                bloqueado: dados.bloqueado,
            },
        });
        return this.remodelar(gasFornecedor);
    }

    public async atualizar(
        id: number,
        dados: IGasFornecedor
    ): Promise<IGasFornecedor> {
        const gasFornecedor = await this.db.gas_fornecedor.update({
            where: { id },
            data: {
                id_fornecedor: dados.fornecedorId,
                id_gas: dados.gasId,
                bloqueado: dados.bloqueado,
            },
        });
        return this.remodelar(gasFornecedor);
    }

    public async buscar(): Promise<IGasFornecedor[]> {
        const gasFornecedor = await this.db.gas_fornecedor.findMany();
        return gasFornecedor.map((g) => this.remodelar(g));
    }

    public async buscarPorFornecedorId(
        fornecedorId: number
    ): Promise<IGasFornecedor[]> {
        const gasFornecedor = await this.db.gas_fornecedor.findMany({
            where: { id_fornecedor: fornecedorId },
        });
        return gasFornecedor.map((g) => this.remodelar(g));
    }

    public async buscarPorId(id: number): Promise<IGasFornecedor | null> {
        const gasFornecedor = await this.db.gas_fornecedor.findUnique({
            where: { id },
        });
        if (!gasFornecedor) return null;
        return this.remodelar(gasFornecedor);
    }

    public async excluir(id: number): Promise<IGasFornecedor> {
        const gasFornecedor = await this.db.gas_fornecedor.delete({
            where: { id },
        });
        return this.remodelar(gasFornecedor);
    }

    private remodelar(gasFornecedor: {
        id: number;
        bloqueado: boolean;
        id_fornecedor: number | null;
        id_gas: number | null;
    }): IGasFornecedor {
        return {
            id: gasFornecedor.id,
            bloqueado: gasFornecedor.bloqueado,
            fornecedorId: gasFornecedor.id_fornecedor!,
            gasId: gasFornecedor.id_gas!,
        };
    }
}
