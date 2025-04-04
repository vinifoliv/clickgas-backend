import { Router } from "express";
import { IGas } from "../interface/IGas";
import { gasModel } from "../main";

const gasController = Router();

gasController.post("/gas", async (req, res) => {
    if (!gasValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const gas = montarGas(req.body);
    const gasExiste = await gasModel.buscarPorPeso(gas.peso);
    if (gasExiste) {
        res.status(400).send("Gás já cadastrado.");
        return;
    }

    const gasCriado = await gasModel.criar(gas);
    res.status(201).json(gasCriado);
});

gasController.get("/gas", async (_, res) => {
    const gases = await gasModel.buscar();
    res.status(200).json(gases);
});

gasController.get("/gas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const gas = await gasModel.buscarPorId(id);
    if (!gas) {
        res.status(404).send("Gás não encontrado.");
        return;
    }
    res.status(200).json(gas);
});

gasController.put("/gas/:id", async (req, res) => {
    if (!gasValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    const id = Number(req.params.id);
    const gas = montarGas(req.body);
    const gasExiste = await gasModel.buscarPorId(id);
    if (!gasExiste) {
        res.status(404).send("Gás não encontrado.");
        return;
    }

    const gasMesmoPeso = await gasModel.buscarPorPeso(gas.peso);
    if (gasMesmoPeso && gasMesmoPeso.id !== id) {
        res.status(422).send("Gás já cadastrado.");
        return;
    }

    const gasAlterado = await gasModel.alterar(id, gas);
    res.status(200).json(gasAlterado);
});

gasController.delete("/gas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const gasExiste = await gasModel.buscarPorId(id);
    if (!gasExiste) {
        res.status(404).send("Gás não encontrado.");
        return;
    }

    const gasExcluido = await gasModel.excluir(id);
    res.status(200).json(gasExcluido);
});

const gasValido = (gas: any): boolean => {
    if (!gas.nome) return false;
    if (!gas.valor) return false;
    if (!gas.peso) return false;
    return true;
};

const montarGas = (body: any): IGas => {
    return {
        nome: body.nome,
        valor: body.valor,
        descricao: body.descricao,
        peso: body.peso,
        icone: body.icone,
    };
}

export { gasController }