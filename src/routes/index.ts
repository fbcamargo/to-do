import { Router } from "express";
import { TYPES } from "../types/types";
import { container } from "../config/container";
import { UserController } from "../controllers/UserController";

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.post("/user", userController.store.bind(userController));

export default router;
