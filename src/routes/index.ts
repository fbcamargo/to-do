import { Router } from "express";
import { TYPES } from "../types/types";
import { container } from "../config/container";
import { UserController } from "../controllers/UserController";

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.post("/user", userController.store.bind(userController));
router.get("/user/:id", userController.show.bind(userController));
router.delete("/user/:id", userController.destroy.bind(userController));

export default router;
