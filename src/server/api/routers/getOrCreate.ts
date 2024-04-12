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
            }
            console.log("Creating epochs for user...");
            await ctx.db.epoch.createMany({
                data: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
                    order: i,
                    title: "",
                    userId: ctx.session.user.id,
                })),
            });

            const createdEpochs = await ctx.db.epoch.findMany({
                where: { userId: ctx.session.user.id },
                orderBy: { order: "asc" },
            });

            return createdEpochs;
        }),
    },
};
