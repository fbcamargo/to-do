import { Request, Response } from "express";
import { ZodError } from "zod";
import { UserService } from "../models/users/services/UserServices";
import UserStoreDtoSchema from "../models/users/dtos/UserStoreDto";
import { injectable, inject } from "inversify";
import { TYPES } from "../types/types";
import { Prisma } from "@prisma/client";
import UserResponseDtoSchema from "../models/users/dtos/UserResponseDto";

@injectable()
class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async store(req: Request, res: Response) {
    try {
      const parsed = UserStoreDtoSchema.safeParse(req.body);
      if (parsed.success) {
        const user = await this.userService.store(parsed.data);
        return res.status(201).json(UserResponseDtoSchema.parse(user));
      } else {
        return res.status(400).json({ error: parsed.error.issues });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.issues });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res
            .status(400)
            .json({ error: "This email is already in use, try another one" });
        }
      }
      return res.sendStatus(500);
    }
  }
  async show({ request: { id: number } }, res: Response) {}
  async destroy({ body: { id: number } }, res: Response) {}
}

export { UserController };
