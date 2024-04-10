import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const GetExampleSchema = z.object({ exampleId: z.string() });
export type GetExampleOpts = z.infer<typeof GetExampleSchema>;

export const UpdateExampleSchema = z.object({});
export type UpdateExampleOpts = z.infer<typeof UpdateExampleSchema>;

export const exampleRouter = createTRPCRouter({
    get: protectedProcedure
        .input(GetExampleSchema)
        .query(async ({ ctx, input }) => {
            return await ctx.db.account.findUnique({
                where: {
                    id: input.exampleId,
                },
            });
        }),

    update: protectedProcedure
        .input(UpdateExampleSchema)
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
