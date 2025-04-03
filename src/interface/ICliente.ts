export interface ICliente {
    readonly id?: number;
    readonly nome: string;
    readonly email: string;
    readonly senha: string;
    readonly telefone: string | null;
    readonly endereco: string | null;
    readonly icone: string | null;
    readonly dataCadastro: Date;
}