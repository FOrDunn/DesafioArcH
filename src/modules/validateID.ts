import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { transacoes_unitarias } from "../config/retryFunction";

export async function validateID(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const number = Joi.number();
    const id: number = Number(request.params.id);
    await number.validateAsync(id);
    const verifyID = await transacoes_unitarias.findOne({ id: id });

    if (verifyID == null) {
      throw new Error();
    }
    return next();
  } catch {
    return response.status(404).json({ error: "Not a Valid id" });
  }
}
