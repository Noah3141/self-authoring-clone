import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const GetExtendedAnalysisSchema = z.object({
    extendedAnalysisId: z.string(),
});
type GetExtendedAnalysisOpts = z.infer<typeof GetExtendedAnalysisSchema>;

export const UpdateExtendedAnalysisSchema = z.object({});
type UpdateExtendedAnalysisOpts = z.infer<typeof UpdateExtendedAnalysisSchema>;

export const extendedAnalysisRouter = createTRPCRouter({
    get: protectedProcedure
        .input(GetExtendedAnalysisSchema)
        .query(async ({ ctx, input }) => {
            return await ctx.db.account.findUnique({
                where: {
                    id: input.extendedAnalysisId,
                },
            });
        }),

    update: protectedProcedure
        .input(UpdateExtendedAnalysisSchema)
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
