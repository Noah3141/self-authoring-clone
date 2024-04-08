import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const GetEpochSchema = z.object({ epochId: z.string() });
type GetEpochOpts = z.infer<typeof GetEpochSchema>;

export const UpdateEpochSchema = z.object({});
type UpdateEpochOpts = z.infer<typeof UpdateEpochSchema>;

export const epochRouter = createTRPCRouter({
    get: protectedProcedure
        .input(GetEpochSchema)
        .query(async ({ ctx, input }) => {
            return await ctx.db.epoch.findUnique({
                where: {
                    id: input.epochId,
                },
            });
        }),

    update: protectedProcedure
        .input(UpdateEpochSchema)
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
