import * as express from "express";
import * as cors from "cors";
import { router } from "./router/router";

const app = express();
const port: number = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(router);
app.listen(port);
