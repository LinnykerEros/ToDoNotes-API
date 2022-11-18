import { Router } from "express";
import { noteRoutes } from "./notesRoutes";
import { tokenRoutes } from "./tokenRoutes";
import { userRoutes } from "./userRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/note", noteRoutes);

//TOKEN Routes
router.use("/token", tokenRoutes);

export { router };
