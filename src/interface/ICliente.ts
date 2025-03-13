export interface ICliente {
    readonly nome: string;
    readonly email: string;
    readonly senha: string;
    readonly telefone: number;
    readonly endereco: string;
    readonly icone: string;
    readonly dataNascimento: Date;
}