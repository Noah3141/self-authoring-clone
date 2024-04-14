import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { Prisma } from "@prisma/client";

export const updateRouter = createTRPCRouter({
    /**
     *
     */
    extendedAnalyses: {
        selectedList: protectedProcedure
            .input(
                z.object({
                    selected: z.record(z.string(), z.boolean()),
                }),
            )
            .mutation(async ({ ctx, input }) => {
                const extantAnalyses = await ctx.db.extendedAnalysis.findMany({
                    where: { userId: ctx.session.user.id },
                });

                if (!extantAnalyses.length) {
                    // They don't have any yet
                    const _newAnalyses =
                        await ctx.db.extendedAnalysis.createMany({
                            data: Object.entries(input.selected).map(
                                ([experienceId, selected]) => ({
                                    experienceId,
                                    selected,
                                    userId: ctx.session.user.id,
                                }),
                            ),
                        });
                } else {
                    // We have some extant Analysis models. Does one exist for each experience?

                    if (
                        extantAnalyses.length !==
                        Object.keys(input.selected).length
                    ) {
                        const _newAnalyses =
                            await ctx.db.extendedAnalysis.createMany({
                                data: Object.entries(input.selected)
                                    // Go through our input object, which has a key for every experience right now
                                    .map(([experienceId, selected]) => {
                                        if (
                                            // if the extant extendedAnalysis list does not contain one of the ids in the total list,
                                            !extantAnalyses
                                                .map(
                                                    (extantAnalysis) =>
                                                        extantAnalysis.experienceId,
                                                )
                                                .includes(experienceId)
                                        ) {
                                            // make a new extended analysis for it
                                            return {
                                                userId: ctx.session.user.id,
                                                experienceId: experienceId,
                                                selected,
                                            } satisfies Prisma.ExtendedAnalysisCreateManyInput;
                                        }
                                    })
                                    .filter((item) => !!item),
                            });
                    }

                    // Reacquire the analysis list
                    const newlyExtantAnalyses =
                        await ctx.db.extendedAnalysis.findMany({
                            where: { userId: ctx.session.user.id },
                        });

                    // todo THIS SUCKS - TOO MANY QUERIES

                    const updateQueries = newlyExtantAnalyses.map(
                        async (extendedAnalysis) => {
                            if (
                                input.selected[
                                    extendedAnalysis.experienceId
                                ] !== // Input value
                                extendedAnalysis.selected // DB value
                            ) {
                                // Make it so
                                const updatedExtendedAnalysis =
                                    await ctx.db.extendedAnalysis.update({
                                        where: {
                                            experienceId:
                                                extendedAnalysis.experienceId,
                                            userId: ctx.session.user.id,
                                        },
                                        data: {
                                            selected:
                                                input.selected[
                                                    extendedAnalysis
                                                        .experienceId
                                                ],
                                        },
                                    });

                                return updatedExtendedAnalysis;
                            }
                        },
                    );

                    const responses = await Promise.allSettled(updateQueries);

                    responses.map((response) => {
                        if (response.status === "rejected") {
                            throw new TRPCError({
                                code: "INTERNAL_SERVER_ERROR",
                            });
                        } else {
                            console.log(`
                            ${response.value?.selected}
                            ${response.value?.experienceId}
                            `);
                        }
                    });
                }
            }),
    },

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
