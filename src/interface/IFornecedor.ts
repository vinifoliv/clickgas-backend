export interface IFornecedor {
    readonly id?: number;
    readonly razaoSocial: string;
    readonly email: string;
    readonly telefone: string;
    readonly cnpj: string;
    readonly endereco: string | null;
    readonly icone: string | null;
    readonly dataCadastro?: Date;
}