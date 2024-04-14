import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const orCreateRouter = {
    epochs: {
        byUser: protectedProcedure.query(async ({ ctx }) => {
            const epochs = await ctx.db.epoch.findMany({
                where: { userId: ctx.session.user.id },
                orderBy: { order: "asc" },
            });

            if (!!epochs.length) {
                return epochs;
            } else {
                await ctx.db.epoch.createMany({
                    data: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
                        order: i,
                        userId: ctx.session.user.id,
                        // DB default for title
                    })),
                });

                const createdEpochs = await ctx.db.epoch.findMany({
                    where: { userId: ctx.session.user.id },
                    orderBy: { order: "asc" },
                });

                return createdEpochs;
            }
        }),
    },
    /**
     * Get or create Experiences
     */
    experiences: {
        forEpochId: protectedProcedure
            .input(z.object({ epochId: z.string() }))
            .query(async ({ ctx, input }) => {
                const experiences = await ctx.db.experience.findMany({
                    where: {
                        userId: ctx.session.user.id,
                        epochId: input.epochId,
                    },
                    orderBy: { order: "asc" },
                });

                if (!!experiences.length) {
                    return experiences;
                } else {
                    await ctx.db.experience.createMany({
                        data: [1, 2, 3, 4, 5, 6].map((i) => ({
                            order: i,
                            epochId: input.epochId,
                            userId: ctx.session.user.id,
                            // DB defaults for title, description, basicAnalysis
                        })),
                    });

                    const createdExperiences = await ctx.db.experience.findMany(
                        {
                            where: {
                                userId: ctx.session.user.id,
                                epochId: input.epochId,
                            },
                            orderBy: { order: "asc" },
                        },
                    );

                    return createdExperiences;
                }
            }),
    },
};
