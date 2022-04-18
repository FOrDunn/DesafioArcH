import express, { Request, Response } from "express";
import { transacoes_unitarias, client } from "../config/retryFunction";

const router = express.Router();

router.put("/recalculador", async (request: Request, response: Response) => {
  const inicialDate = undefined;
  const endDate = undefined;

  const filterObjects = {};
  if (inicialDate) Object.assign(filterObjects, { $gt: inicialDate });
  if (endDate) Object.assign(filterObjects, { $gt: endDate });
  const all_transactions = await transacoes_unitarias.find(filterObjects);
  const saldos = all_transactions.reduce((acumulador, item) => {
    const id_saldo = acumulador.get(item.id);
    const valor = item.tipo === "debito" ? -item.valor : item.valor;
    if (id_saldo) {
      acumulador.set(item.id, Number(id_saldo) + valor);
    } else {
      acumulador.set(item.id, valor);
    }
    return acumulador;
  }, new Map<number, number>());
  await Promise.all(
    Array.from(saldos).map((saldoData) =>
      client.set(`${saldoData[0]}`, saldoData[1])
    )
  );
  return response.status(200);
});

export default router;
