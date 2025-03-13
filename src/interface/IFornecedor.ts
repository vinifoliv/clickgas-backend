export interface IFornecedor {
    readonly razaoSocial: number;
    readonly email: string;
    readonly telefone: number;
    readonly cnpj: number;
    readonly endereco: string;
    readonly icone: string;
    readonly dataCadastro: Date;
}