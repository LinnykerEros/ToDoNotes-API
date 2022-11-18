import { Router } from "express";
import { TokenController } from "../../Controllers/TokenController";

const tokenRoutes = Router();
const tokenController = new TokenController();

//POST
tokenRoutes.post("/", tokenController.handle);

export { tokenRoutes };
