import { IFornecedor } from "./IFornecedor";
import { IGas } from "./IGas";

export interface IGasFornecedor {
    readonly fornecedor: IFornecedor;
    readonly gas: IGas;
    readonly bloqueado: boolean;
}