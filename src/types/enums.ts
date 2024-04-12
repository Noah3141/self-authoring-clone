import { z } from "zod";

export const UserRoleSchema = z.enum(["user", "admin"]);
export type UserRole = z.infer<typeof UserRoleSchema>;
