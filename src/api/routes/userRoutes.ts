import { Router } from "express";

import { UsersController } from "../../Controllers/UserController";

import loginRequired from "../middlewares/loginRequired";
const userRoutes = Router();
const usersController = new UsersController();

//POST
userRoutes.post("/", usersController.createUser);

//GET
userRoutes.get("/", usersController.findAllUsers);
userRoutes.get("/:id", loginRequired, usersController.findUser);

//UPDATE
userRoutes.put("/:id", loginRequired, usersController.updateUser);

//DELETE
userRoutes.delete("/:id", loginRequired, usersController.deleteUser);

export { userRoutes };
