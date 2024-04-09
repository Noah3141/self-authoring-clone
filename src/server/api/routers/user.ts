import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const GetUserSchema = z.object({ userId: z.string() });
type GetUserOpts = z.infer<typeof GetUserSchema>;

export const UpdateUserSchema = z.object({});
type UpdateUserOpts = z.infer<typeof UpdateUserSchema>;

export const userRouter = createTRPCRouter({
    epochs: {
        all: protectedProcedure.query(async ({ ctx }) => {
            return await ctx.db.epoch.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
            });
        }),

        allWith: {},
    },

    get: protectedProcedure
        .input(GetUserSchema)
        .query(async ({ ctx, input }) => {
            return await ctx.db.account.findUnique({
                where: {
                    id: input.userId,
                },
            });
        }),

    update: protectedProcedure
        .input(UpdateUserSchema)
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
