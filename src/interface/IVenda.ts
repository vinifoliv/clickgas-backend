import { ICliente } from "./ICliente";
import { IFornecedor } from "./IFornecedor";
import { IGas } from "./IGas";
import { IPagamento } from "./IPagamento";

export interface IVenda {
    readonly fornecedor: IFornecedor;
    readonly cliente: ICliente;
    readonly gas: IGas;
    readonly pagamento: IPagamento;
    readonly quantidade: number;
    readonly valorTotal: number;
    readonly dataCadastro: Date;
}