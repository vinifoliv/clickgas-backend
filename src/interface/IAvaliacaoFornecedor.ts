export interface IAvaliacaoFornecedor {
    readonly id?: number;
    readonly fornecedorId: number;
    readonly clienteId: number;
    readonly avaliacao: number;
}
