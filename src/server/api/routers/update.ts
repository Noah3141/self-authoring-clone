import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { Prisma } from "@prisma/client";
import { wordCount } from "~/utils/authoring";

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
                                    effectAnalysis: "",
                                    eventAnalysis: "",
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
                                                effectAnalysis: "",
                                                eventAnalysis: "",
                                            } satisfies Prisma.ExtendedAnalysisCreateManyInput;
                                        }
                                    })
                                    .filter(
                                        (item) => !!item,
                                    ) as Prisma.ExtendedAnalysisCreateManyInput[],
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
                        }
                    });
                }
            }),
    },
    /**
     *
     */
    extendedAnalysis: {
        eventAnalysis: protectedProcedure
            .input(
                z.object({
                    experienceId: z.string(),
                    eventAnalysis: z.string(),
                }),
            )
            .mutation(async ({ ctx, input }) => {
                const updatedExtendedAnalysis =
                    await ctx.db.extendedAnalysis.update({
                        where: {
                            userId: ctx.session.user.id,
                            experienceId: input.experienceId,
                        },
                        data: {
                            eventAnalysis: input.eventAnalysis,
                        },
                    });

                return;
            }),
        effectAnalysis: protectedProcedure
            .input(
                z.object({
                    experienceId: z.string(),
                    effectAnalysis: z.string(),
                }),
            )
            .mutation(async ({ ctx, input }) => {
                const updatedExtendedAnalysis =
                    await ctx.db.extendedAnalysis.update({
                        where: {
                            userId: ctx.session.user.id,
                            experienceId: input.experienceId,
                        },
                        data: {
                            effectAnalysis: input.effectAnalysis,
                        },
                    });

                return;
            }),
    },

    /**
     *
     */
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

                if (wordCount(input.description) > 300) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Your input has exceeded the maximum length!",
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

    futureAuthoring: protectedProcedure
        .input(
            z.object({
                oneThingYouCouldDoBetter: z.string().optional(),
                thingsToLearnAbout: z.string().optional(),
                improveYourHabits: z.string().optional(),
                socialLife: z.string().optional(),
                leisureLife: z.string().optional(),
                familyLife: z.string().optional(),
                careerLife: z.string().optional(),
                qualitiesYouAdmire: z.string().optional(),
                idealFuture: z.string().optional(),
                worstFuture: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            if (wordCount(Object.values(input).join(" ")) > 300) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Your input has exceeded the maximum length!",
                });
            }

            await ctx.db.futureAuthoring.update({
                where: { userId: ctx.session.user.id },
                data: input satisfies Prisma.FutureAuthoringUpdateInput,
            });
        }),
    /**
     *
     */
    goals: {
        priority: protectedProcedure
            .input(
                z.array(
                    z.object({
                        priority: z.number(),
                        goalId: z.string(),
                    }),
                ),
            )
            .mutation(async ({ ctx, input }) => {
                const reordered = await Promise.allSettled(
                    input.map(async (newState) => {
                        const newPlacement = await ctx.db.goal.update({
                            where: {
                                userId: ctx.session.user.id,
                                id: newState.goalId,
                            },
                            data: {
                                priority: newState.priority,
                            },
                        });
                    }),
                );

                return;
            }),
    },
    /**
     *
     */
    goal: protectedProcedure
        .input(
            z.object({
                goalId: z.string(),
                isMain: z.boolean().optional(),
                priority: z.number().optional(),
                title: z.string().optional(),
                description: z.string().optional(),
                motiveAnalysis: z.string().optional(),
                impactAnalysis: z.string().optional(),
                strategicAnalysis: z.string().optional(),
                obstacleAnalysis: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input: { goalId, ...input } }) => {
            if (input.title === "") {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Please provide a goal title!",
                });
            }

            if (!!input.title && input.title.length < 3) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Please provide a longer title!",
                });
            }

            if (input.description === "") {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Please provide a goal description!",
                });
            }

            if (wordCount(Object.values(input).join(" ")) > 300) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Your input has exceeded the maximum length!",
                });
            }

            try {
                await ctx.db.goal.update({
                    where: {
                        id: goalId,
                        userId: ctx.session.user.id,
                    },
                    data: input satisfies Prisma.GoalUpdateInput,
                });
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message:
                        "Something's not right with our database right now. Please try again in a bit.",
                });
            }
        }),
});
