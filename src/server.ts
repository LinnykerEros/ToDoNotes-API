import express from "express";
import { router } from "./api/routes/router";
import cors from "cors";
const app = express();

const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log("Online server at localhost:3030"));
