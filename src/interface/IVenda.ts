export interface IVenda {
    readonly id?: number;
    readonly fornecedorId: number | null;
    readonly clienteId: number | null;
    readonly gasId: number | null;
    readonly pagamentoId: number | null;
    readonly quantidade: number;
    readonly valorTotal: number;
    readonly dataCadastro: Date;
}
