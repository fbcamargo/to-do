import { PrismaClient } from "@prisma/client";
import { UserStoreDto } from "../dtos/UserStoreDto";
import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types/types";
import { UserEntity } from "../entities/UserEntity";

@injectable()
class UserService {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {}
  async store(UserStoreDto: UserStoreDto): Promise<UserEntity> {
    const hashPassword = await bcrypt.hash(UserStoreDto.password, 10);
    return await this.prismaClient.user.create({
      data: {
        email: UserStoreDto.email,
        password: hashPassword,
        avatar: UserStoreDto.avatar,
      },
    });
  }
  async findById(id: number): Promise<UserEntity> {
    return await this.prismaClient.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }
  async destroy(id: number) {
    return await this.prismaClient.user.delete({
      where: { id },
    });
  }
}

export { UserService };
