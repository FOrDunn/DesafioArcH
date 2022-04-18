import { differenceInSeconds } from "date-fns";

export const local_data = new Map<number, Ilocaldata>();

export function validateBalanceMemory(id: number) {
  const balance_memory = local_data.get(id);
  if (
    balance_memory &&
    differenceInSeconds(new Date(), balance_memory.data) < 5
  )
    return balance_memory;
}

export function saveMemory(id: number, saldo: number) {
  local_data.set(id, { valor: saldo, data: new Date() });
}
