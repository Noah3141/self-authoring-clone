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

    /**
     * Update an experience object
     */
    experience: {
        /**
         *  Update experience title
         */
        title: protectedProcedure
            .input(z.object({ experienceId: z.string(), title: z.string() }))
            .mutation(async ({ ctx, input }) => {
                if (input.title === "") {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message:
                            "Please provide a title, or remove unwanted experiences.",
                    });
                }
                if (input.title.length < 3) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Please provide a longer title",
                    });
                }

                await ctx.db.experience.update({
                    where: { id: input.experienceId },
                    data: { title: input.title },
                });
            }),
        /**
         * Update experience description
         */
        description: protectedProcedure
            .input(
                z.object({ experienceId: z.string(), description: z.string() }),
            )
            .mutation(async ({ ctx, input }) => {
                if (input.description === "") {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message:
                            "Please provide a title, or remove unwanted epochs.",
                    });
                }

                if (input.description.length < 3) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Please provide a longer description",
                    });
                }

                await ctx.db.experience.update({
                    where: {
                        id: input.experienceId,
                        userId: ctx.session.user.id,
                    },
                    data: { description: input.description },
                });
            }),
        /**
         *
         */
        basicAnalysis: protectedProcedure
            .input(
                z.object({
                    experienceId: z.string(),
                    basicAnalysis: z.string(),
                }),
            )
            .mutation(async ({ ctx, input }) => {
                if (input.basicAnalysis === "") {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Please provide an input.",
                    });
                }

                if (input.basicAnalysis.length < 3) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Please provide a longer analysis",
                    });
                }

                await ctx.db.experience.update({
                    where: {
                        id: input.experienceId,
                        userId: ctx.session.user.id,
                    },
                    data: { basicAnalysis: input.basicAnalysis },
                });
            }),
    },
});
