import { Router } from "express";

import { NoteController } from "../../Controllers/NoteController";

import loginRequired from "../middlewares/loginRequired";
const noteRoutes = Router();
const noteController = new NoteController();

//POST
noteRoutes.post("/", noteController.createNote);

//GET
noteRoutes.get("/", noteController.findAllNotes);
noteRoutes.get("/:id", loginRequired, noteController.findNote);

//UPDATE
noteRoutes.put("/:id", loginRequired, noteController.updateNote);

//DELETE
noteRoutes.delete("/:id", loginRequired, noteController.deleteNote);

export { noteRoutes };
