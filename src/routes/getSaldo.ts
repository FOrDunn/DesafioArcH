import express, { Request, Response } from "express";
import { validateID } from "../modules/validateID";
import { mongoRecalculator } from "../db/mongodb/mongoRecalculator";
import { saveMemory, validateBalanceMemory } from "../db/localmemory";
import { redisSearch } from "../db/redis/redisSearch";

const router = express.Router();

router.get("/:id", validateID, async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);
  const balance_memory = validateBalanceMemory(id);

  if (balance_memory) {
    return response.status(201).json({ saldo: balance_memory.valor });
  }

  const redisSaldo = await redisSearch(id);
  if (redisSaldo) {
    saveMemory(id, redisSaldo);
    return response.status(201).json({ saldo: redisSaldo });
  }
  const mongoSaldo = await mongoRecalculator(id);
  if (mongoSaldo) {
    saveMemory(id, mongoSaldo);
    return response.status(201).json({ saldo: mongoSaldo });
  }
});

export default router;
