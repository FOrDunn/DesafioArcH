import mongoose from "mongoose";
import { createClient } from "redis";

export const collectionname = "transacoes_unitarias";

export const client = createClient({});

export async function retry() {
  try {
    await mongoose.connect("mongodb://localhost:27017/desafioarch");
    await client.connect();
  } catch (error) {
    console.log(error);
  }
}

export const pagamento = new mongoose.Schema<Ipayment>({
  id: Number,
  data: Date,
  valor: Number,
  tipo: {
    type: String,
    enum: ["debito", "credito"],
  },
});

export const transacoes_unitarias = mongoose.model(collectionname, pagamento);
