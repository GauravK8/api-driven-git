import "dotenv/config";
import express, { Application } from "express";
import { router } from "@/routes";
import cors from "cors";

const app: Application = express();
const port = process.env.PORT;

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`Server is up and running on port:${port}`)
);
