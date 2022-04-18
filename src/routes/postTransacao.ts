import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { collectionname, pagamento, client } from "../config/retryFunction";

const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  const { id, valor, tipo }: Irequest = request.body;

  const transacoes_unitarias = mongoose.model(collectionname, pagamento);

  const transacao_unitaria = new transacoes_unitarias({
    id: id,
    data: new Date(),
    valor: valor,
    tipo: tipo,
  });

  await transacao_unitaria.save();

  const conversor: number =
    transacao_unitaria.tipo == "debito"
      ? -transacao_unitaria.valor
      : transacao_unitaria.valor;

  const saldo = Number(await client.get(`${id}`)) + conversor;
  await client.set(`${id}`, saldo);

  return response.status(202).json(saldo);
});

export default router;
