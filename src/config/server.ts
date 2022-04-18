import express from "express";
import cors from "cors";
import { retry } from "./retryFunction";
import routerSaldo from "../routes/getSaldo";
import routerTransacao from "../routes/postTransacao";
import routerRecalculador from "../routes/getRecalculador";
const app = express();

app.use(cors());
app.use(express.json());

retry();

app.use(routerSaldo);
app.use(routerTransacao);
app.use(routerRecalculador);

app.listen(3333);
