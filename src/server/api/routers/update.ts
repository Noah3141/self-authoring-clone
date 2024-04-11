import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const updateRouter = createTRPCRouter({
    epoch: {
        title: protectedProcedure
            .input(z.object({ epochId: z.string(), title: z.string() }))
            .mutation(async ({ ctx, input }) => {
                if (input.title === "") {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message:
                            "Please provide a title, or remove unwanted epochs.",
                    });
                }
                if (input.title.length < 3) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Please provide a longer title",
                    });
                }

                await ctx.db.epoch.update({
                    where: { id: input.epochId },
                    data: { title: input.title },
                });
            }),
    },
});
