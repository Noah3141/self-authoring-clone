import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const createRouter = createTRPCRouter({
    epoch: {
        push: protectedProcedure.mutation(async ({ ctx }) => {
            const lastEpoch = await ctx.db.epoch.findFirst({
                where: { userId: ctx.session.user.id },
                orderBy: { order: "desc" },
            });

            await ctx.db.epoch.create({
                data: {
                    title: "",
                    order: (lastEpoch?.order ?? 0) + 1,
                    userId: ctx.session.user.id,
                },
            });
        }),
    },
    experience: {
        push: protectedProcedure
            .input(z.object({ epochId: z.string() }))
            .mutation(async ({ ctx, input }) => {
                const lastExperience = await ctx.db.experience.findFirst({
                    where: { userId: ctx.session.user.id },
                    orderBy: { order: "desc" },
                });

                if (lastExperience?.order === 8) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message:
                            "If you want to explore more than 8 experiences, consider breaking the epoch into multiple.",
                    });
                }

                await ctx.db.experience.create({
                    data: {
                        title: "",
                        description: "",
                        order: (lastExperience?.order ?? 0) + 1,
                        userId: ctx.session.user.id,
                        epochId: input.epochId,
                    },
                });
            }),
    },
});
