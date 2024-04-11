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
});
