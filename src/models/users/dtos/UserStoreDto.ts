import { z } from "zod";

const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8}$/;

const UserStoreDtoSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .trim()
      .min(8)
      .max(20)
      .regex(regex, {
        message: `Ensure string has one uppercase letters.
Ensure string has one lowercase letters.
Ensure string has one number.
Ensure string has one special case letter.`,
      }),
    confirm: z.string(),
    avatar: z.string().nullable(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default UserStoreDtoSchema;
export type UserStoreDto = z.infer<typeof UserStoreDtoSchema>;
