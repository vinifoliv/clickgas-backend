export interface IVenda {
    readonly fornecedorId: number;
    readonly clienteId: number;
    readonly gasId: number;
    readonly formaPagamentoId: number;
    readonly quantidade: number;
    readonly valorTotal: number;
    readonly dataCadastro: Date;
}