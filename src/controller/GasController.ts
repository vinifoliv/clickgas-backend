import { Express } from "express";
import { IGas } from "../interface/IGas";
import { GasModel } from "../model/GasModel";

export class GasController {
    constructor(
        private readonly httpServer: Express,
        private readonly gasModel: GasModel
    ) {
        this.httpServer.post("/gas", async (req, res) => {
            if (!this.gasValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const gas = this.montarGas(req.body);
            const gasExiste = await this.gasModel.buscarPorPeso(gas.peso);
            if (gasExiste) {
                res.status(400).json({ message: "Gás já cadastrado." });
                return;
            }

            const gasCriado = await this.gasModel.criar(gas);
            res.status(201).json(gasCriado);
        });

        this.httpServer.get("/gas", async (_, res) => {
            const gases = await gasModel.buscar();
            res.status(200).json(gases);
        });

        this.httpServer.get("/gas/:id", async (req, res) => {
            const id = Number(req.params.id);
            const gas = await this.gasModel.buscarPorId(id);
            if (!gas) {
                res.status(404).json({ message: "Gás não encontrado." });
                return;
            }
            res.status(200).json(gas);
        });

        this.httpServer.put("/gas/:id", async (req, res) => {
            if (!this.gasValido(req.body)) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            const id = Number(req.params.id);
            const gas = this.montarGas(req.body);
            const gasExiste = await this.gasModel.buscarPorId(id);
            if (!gasExiste) {
                res.status(404).json({ message: "Gás não encontrado." });
                return;
            }

            const gasMesmoPeso = await gasModel.buscarPorPeso(gas.peso);
            if (gasMesmoPeso && gasMesmoPeso.id !== id) {
                res.status(422).json({ message: "Gás já cadastrado." });
                return;
            }

            const gasAlterado = await this.gasModel.alterar(id, gas);
            res.status(200).json(gasAlterado);
        });

        this.httpServer.delete("/gas/:id", async (req, res) => {
            const id = Number(req.params.id);
            const gasExiste = await this.gasModel.buscarPorId(id);
            if (!gasExiste) {
                res.status(404).json({ message: "Gás não encontrado." });
                return;
            }

            const gasExcluido = await this.gasModel.excluir(id);
            res.status(200).json(gasExcluido);
        });
    }

    private gasValido(gas: any): boolean {
        if (!gas.nome) return false;
        if (!gas.valor) return false;
        if (!gas.peso) return false;
        return true;
    }

    private montarGas(body: any): IGas {
        return {
            nome: body.nome,
            valor: body.valor,
            descricao: body.descricao,
            peso: body.peso,
            icone: body.icone,
        };
    }
}
