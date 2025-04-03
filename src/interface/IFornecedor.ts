export interface IFornecedor {
    readonly id?: number;
    readonly razaoSocial: number;
    readonly email: string;
    readonly telefone: number;
    readonly cnpj: number;
    readonly endereco: string;
    readonly icone: string;
    readonly dataCadastro: Date;
}