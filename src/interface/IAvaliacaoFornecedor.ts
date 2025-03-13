import { ICliente } from "./ICliente";
import { IFornecedor } from "./IFornecedor";

export interface IAvaliacaoFornecedor {
    readonly fornecedor: IFornecedor;
    readonly cliente: ICliente;
    readonly avaliacao: number;
    readonly dataCadastro: Date;
}