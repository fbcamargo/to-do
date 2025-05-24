import { Container } from "inversify";
import { TYPES } from "../types/types";
import { UserService } from "../models/users/services/UserServices";
import { UserController } from "../controllers/UserController";
import { PrismaClient } from "@prisma/client";

const container = new Container();

container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

container
  .bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();

container.bind<UserController>(TYPES.UserController).to(UserController);

export { container };
