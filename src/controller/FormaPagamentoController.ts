import { Express } from "express";
import { IFormaPagamento } from "../interface/IFormaPagamento";
import { FormaPagamentoModel } from "../model/FormaPagamentoModel";

export class FormaPagamentoController {
    constructor(
        private readonly httpServer: Express,
        private readonly formaPagamentoModel: FormaPagamentoModel
    ) {
        this.httpServer.post("/forma-pagamento", async (req, res) => {
            if (!this.formaPagamentoValida(req.body)) {
                res.status(400).send("Dados inválidos.");
                return;
            }

            const formaPagamento = this.montarFormaPagamento(req.body);
            const formaPagamentoExiste =
                await formaPagamentoModel.buscarPorNome(formaPagamento.nome);
            if (!formaPagamentoExiste) {
                res.status(404).send("Forma de pagamento não encontrada.");
                return;
            }

            const formaPagamentoCriada = await formaPagamentoModel.criar(
                formaPagamento
            );
            res.status(201).json(formaPagamentoCriada);
        });

        this.httpServer.get("/forma-pagamento", async (_, res) => {
            const formasPagamento = await formaPagamentoModel.buscar();
            res.status(200).json(formasPagamento);
        });

        this.httpServer.put("/forma-pagamento/:id", async (req, res) => {
            if (!this.formaPagamentoValida(req.body)) {
                res.status(400).send("Dados inválidos.");
                return;
            }

            const id = Number(req.params.id);
            const formaPagamento = this.montarFormaPagamento(req.body);
            const formaPagamentoExiste = await formaPagamentoModel.buscarPorId(
                id
            );
            if (!formaPagamentoExiste) {
                res.status(404).send("Forma de pagamento não encontrada.");
                return;
            }

            const formaPagamentoMesmoNome =
                await formaPagamentoModel.buscarPorNome(formaPagamento.nome);
            if (formaPagamentoMesmoNome && formaPagamentoMesmoNome.id !== id) {
                res.status(422).send("Forma de pagamento já cadastrada.");
                return;
            }

            const formaPagamentoAlterada = await formaPagamentoModel.alterar(
                id,
                formaPagamento
            );
            res.status(200).json(formaPagamentoAlterada);
        });

        this.httpServer.delete("/forma-pagamento/:id", async (req, res) => {
            const id = Number(req.params.id);
            const formaPagamentoExiste = await formaPagamentoModel.buscarPorId(
                id
            );
            if (!formaPagamentoExiste) {
                res.status(404).send("Forma de pagamento não encontrada.");
                return;
            }

            const formaPagamentoExcluida = await formaPagamentoModel.excluir(
                id
            );
            res.status(200).json(formaPagamentoExcluida);
        });
    }

    private formaPagamentoValida(formaPagamento: any): boolean {
        if (!formaPagamento.nome) return false;
        if (!formaPagamento.icone) return false;
        return true;
    }

    private montarFormaPagamento(body: any): IFormaPagamento {
        return {
            nome: body.nome,
            icone: body.icone,
        };
    }
}
