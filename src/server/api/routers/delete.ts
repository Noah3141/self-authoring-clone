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
});
