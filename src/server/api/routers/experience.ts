import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const GetExperienceSchema = z.object({ experienceId: z.string() });
type GetExperienceOpts = z.infer<typeof GetExperienceSchema>;

export const UpdateExperienceSchema = z.object({});
type UpdateExperienceOpts = z.infer<typeof UpdateExperienceSchema>;

export const experienceRouter = createTRPCRouter({
    get: protectedProcedure
        .input(GetExperienceSchema)
        .query(async ({ ctx, input }) => {
            return await ctx.db.account.findUnique({
                where: {
                    id: input.experienceId,
                },
            });
        }),

    update: protectedProcedure
        .input(UpdateExperienceSchema)
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
