export interface IGasFornecedor {
    readonly id?: number;
    readonly fornecedorId: number;
    readonly gasId: number;
    readonly bloqueado: boolean;
}
