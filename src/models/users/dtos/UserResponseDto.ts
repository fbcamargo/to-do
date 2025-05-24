import z from "zod";

const UserResponseDtoSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  avatar: z.string().nullable(),
});

export default UserResponseDtoSchema;
export type UserResponseDto = z.infer<typeof UserResponseDtoSchema>;
