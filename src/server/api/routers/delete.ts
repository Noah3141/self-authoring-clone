import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const deleteRouter = createTRPCRouter({
    epoch: {
        byId: protectedProcedure
            .input(z.object({ epochId: z.string() }))
            .mutation(async ({ ctx, input }) => {
                const deletedEpoch = await ctx.db.epoch.delete({
                    where: {
                        id: input.epochId,
                        userId: ctx.session.user.id,
                    },
                });

                const updatedOrderEpochs = await ctx.db.epoch.updateMany({
                    where: {
                        userId: ctx.session.user.id,
                        order: { gt: deletedEpoch.order },
                    },
                    data: {
                        order: { decrement: 1 },
                    },
                });
            }),
    },
    experience: {
        byId: protectedProcedure
            .input(z.object({ experienceId: z.string() }))
            .mutation(async ({ ctx, input }) => {
                const experiencesCount = await ctx.db.experience.count({
                    where: { userId: ctx.session.user.id },
                });

                if (experiencesCount <= 1) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message:
                            "If you want to remove this epoch entirely, do so from the Epochs page.",
                    });
                }

                const deletedExperience = await ctx.db.experience.delete({
                    where: {
                        id: input.experienceId,
                        userId: ctx.session.user.id,
                    },
                });

                const updatedOrderExperiences = await ctx.db.epoch.updateMany({
                    where: {
                        userId: ctx.session.user.id,
                        order: { gt: deletedExperience.order },
                    },
                    data: {
                        order: { decrement: 1 },
                    },
                });
            }),
    },
});
