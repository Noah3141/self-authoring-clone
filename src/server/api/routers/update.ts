import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const updateRouter = createTRPCRouter({
    epoch: {
        title: protectedProcedure
            .input(z.object({ epochId: z.string(), title: z.string() }))
            .mutation(async ({ ctx, input }) => {
                await ctx.db.epoch.update({
                    where: { id: input.epochId },
                    data: { title: input.title },
                });
            }),
    },
});
