export interface IGas {
    readonly id?: number;
    readonly nome: string;
    readonly valor: number;
    readonly descricao: string | null;
    readonly peso: number;
    readonly icone: string | null;
    readonly dataCadastro?: Date;
}