import { client, transacoes_unitarias } from "../../config/retryFunction";

export async function mongoRecalculator(id: number) {
  const todasTransacoes = await transacoes_unitarias.find({ id: id });
  const saldo = todasTransacoes.reduce((acumulador, item) => {
    const valor = item.tipo === "debito" ? -item.valor : item.valor;
    return acumulador + valor;
  }, 0);

  await client.set(`${id}`, saldo);

  return saldo;
}
