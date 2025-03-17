import { Router } from "express";
import { IGas } from "../interface/IGas";

export const gasController = Router();

gasController.post("/gas", async (req, res) => {
    if (!gasValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }
    
    // const gas: IGas = montarGas(req.body);
    // const gasExiste = await clienteRepository.buscarPorPeso(gas.peso);
    // if (!gasExiste) {
    //     res.status(404).send("Gás não encontrado.");
    //     return;
    // }

    // const gasCriado = await clienteRepository.cadastrar(gas);
    // res.status(201).json(gasCriado);
});

gasController.get("/gas", async (_, res) => {
    // const gases = await clienteRepository.buscar();
    // res.status(200).json(gases);
});

gasController.put("/gas/:id", async (req, res) => {
    if (!gasValido(req.body)) {
        res.status(400).send("Dados inválidos.");
        return;
    }

    // const id = Number(req.params.id);
    // const gas: IGas = montarGas(req.body);
    // const gasExiste = await clienteRepository.buscarPorId(id);
    // if (!gasExiste) {
    //     res.status(404).send("Gás não encontrado.");
    //     return;
    // }

    // const existePeso = await clienteRepository.buscarPorEmail(gas.peso);
    // if (existePeso && existePeso.id !== id) {
    //     res.status(422).send("Gás já cadastrado.");
    //     return;
    // }

    // const gasAlterado = await clienteRepository.alterar(id, gas);
    // res.status(200).json(gasAlterado);
});

gasController.delete("/clientes/:id", async (req, res) => {
    // const id = Number(req.params.id);
    // const gasExiste = await clienteRepository.buscarPorId(id);
    // if (!gasExiste) {
    //     res.status(404).send("Gás não encontrado.");
    //     return;
    // }

    // const gasExcluido = await clienteRepository.excluir(id);
    // res.status(200).json(gasExcluido);
});

const gasValido = (cliente: any): boolean => {
    if (!cliente.nome) return false;
    if (!cliente.valor) return false;
    if (!cliente.descricao) return false;
    if (!cliente.peso) return false;
    if (!cliente.icone) return false;
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