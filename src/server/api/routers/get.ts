import { z } from "zod";

import {
    adminProcedure,
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { orCreateRouter } from "./getOrCreate";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const getRouter = createTRPCRouter({
    pastAuthoring: {
        complete: protectedProcedure.query(async ({ ctx }) => {
            const autobiography = await ctx.db.epoch.findMany({
                where: { userId: ctx.session.user.id },
                orderBy: { order: "asc" },
                include: {
                    experiences: {
                        orderBy: { order: "asc" },
                        include: {
                            extendedAnalysis: {
                                where: { selected: true },
                            },
                        },
                    },
                },
            });

            if (!autobiography) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return autobiography;
        }),
    },
    users: {
        all: adminProcedure.query(async ({ ctx }) => {
            return await ctx.db.user.findMany({ include: { sessions: true } });
        }),
    },

    /**
     *  Get singluar epochs
     */
    epoch: {
        /**
         *  Use epoch.id to retrieve an epoch
         */
        byId: {
            /**
             *
             */
            alone: protectedProcedure
                .input(z.object({ epochId: z.string() }))
                .query(async ({ ctx, input }) => {
                    const epoch = await ctx.db.epoch.findUnique({
                        where: { id: input.epochId },
                    });

                    if (!epoch) {
                        throw new TRPCError({ code: "NOT_FOUND" });
                    }

                    return epoch;
                }),
            /**
             *  Include the provided epoch with context regarding its order and the user's epoch list
             */
            withOrds: protectedProcedure
                .input(z.object({ epochId: z.string() }))
                .query(async ({ ctx, input }) => {
                    const epoch = await ctx.db.epoch.findUnique({
                        where: {
                            id: input.epochId,
                            userId: ctx.session.user.id,
                        },
                    });

                    if (!epoch) {
                        throw new TRPCError({ code: "NOT_FOUND" });
                    }

                    const previousEpoch = await ctx.db.epoch.findUnique({
                        where: {
                            order: epoch.order - 1,
                            userId: ctx.session.user.id,
                        },
                    });

                    if (epoch.order !== 1 && !previousEpoch) {
                        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
                    }

                    const nextEpoch = await ctx.db.epoch.findUnique({
                        where: {
                            order: epoch.order + 1,
                            userId: ctx.session.user.id,
                        },
                    });

                    return {
                        epoch,
                        previousEpoch,
                        nextEpoch,
                    };
                }),
        },
        last: protectedProcedure.query(async ({ ctx }) => {
            const lastEpoch = ctx.db.epoch.findFirst({
                orderBy: { order: "desc" },
                where: { userId: ctx.session.user.id },
            });
            return lastEpoch;
        }),
    },
    epochs: {
        byUser: protectedProcedure.query(async ({ ctx }) => {
            return await ctx.db.epoch.findMany({
                where: { userId: ctx.session.user.id },
            });
        }),
    },

    /**
     * Get experiences
     */
    experiences: {
        /**
         *
         */
        first: protectedProcedure.query(async ({ ctx }) => {
            const firstEpoch = await ctx.db.epoch.findFirst({
                where: {
                    userId: ctx.session.user.id,
                },
                orderBy: { order: "asc" },
                include: { experiences: { orderBy: { order: "asc" } } },
            });

            if (!firstEpoch) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return firstEpoch.experiences[0];
        }),

        /**
         *
         */
        byId: {
            /**
             *
             */
            alone: {},

            /**
             *
             */
            withOrds: protectedProcedure
                .input(z.object({ experienceId: z.string() }))
                .query(async ({ ctx, input }) => {
                    const experience = await ctx.db.experience.findUnique({
                        where: {
                            id: input.experienceId,
                            userId: ctx.session.user.id,
                        },
                        include: {
                            epoch: { select: { id: true, order: true } },
                        },
                    });

                    if (!experience) {
                        throw new TRPCError({ code: "NOT_FOUND" });
                    }

                    const previousExperience =
                        await ctx.db.experience.findFirst({
                            orderBy: [
                                { epoch: { order: "desc" } },
                                { order: "desc" },
                            ],
                            where: {
                                OR: [
                                    {
                                        // The previous in the same epoch
                                        order: experience.order - 1,
                                        userId: ctx.session.user.id,
                                        epochId: experience.epoch.id,
                                    },
                                    {
                                        // Else the highest on the descending list (i.e. highest) order of the preceding epoch
                                        userId: ctx.session.user.id,
                                        epoch: {
                                            order: experience.epoch.order - 1,
                                        },
                                    },
                                ],
                            },
                        });

                    if (experience.epoch.order !== 1 && !previousExperience) {
                        // If we're not talking about the first epoch, and the previous epoch query above failed to get the previous... Something's wrong
                        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
                    }

                    const nextExperience = await ctx.db.experience.findFirst({
                        orderBy: [
                            { epoch: { order: "asc" } },
                            { order: "asc" },
                        ],
                        where: {
                            OR: [
                                {
                                    // Next in the same epoch
                                    order: experience.order + 1,
                                    userId: ctx.session.user.id,
                                    epochId: experience.epochId,
                                },
                                {
                                    // Else lowest in the next epoch
                                    userId: ctx.session.user.id,
                                    epoch: {
                                        order: experience.epoch.order + 1,
                                    },
                                },
                            ],
                        },
                    });

                    // if (false && !nextExperience) {
                    //     throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
                    // }

                    return {
                        experience,
                        previousExperience,
                        nextExperience,
                    };
                }),
        },
        /**
         *
         */
        byUser: {
            alone: protectedProcedure.query(async ({ ctx }) => {
                return await ctx.db.experience.findMany({
                    where: { userId: ctx.session.user.id },
                    orderBy: [{ epoch: { order: "asc" } }, { order: "asc" }],
                });
            }),
            withExtendedAnalysis: protectedProcedure.query(async ({ ctx }) => {
                return await ctx.db.experience.findMany({
                    where: { userId: ctx.session.user.id },
                    orderBy: [{ epoch: { order: "asc" } }, { order: "asc" }],
                    include: { extendedAnalysis: true },
                });
            }),
        },
    },
    /**
     *
     */
    extendedAnalyses: {
        /**
         *  Include just the analysis model
         */
        byUser: {
            alone: protectedProcedure.query(async ({ ctx }) => {
                return await ctx.db.extendedAnalysis.findMany({
                    where: { userId: ctx.session.user.id },
                    orderBy: { experience: { order: "asc" } },
                });
            }),
            withExperience: protectedProcedure.query(async ({ ctx }) => {
                return await ctx.db.extendedAnalysis.findMany({
                    where: { userId: ctx.session.user.id },
                    orderBy: [
                        { experience: { epoch: { order: "asc" } } },
                        { experience: { order: "asc" } },
                    ],
                    include: { experience: true },
                });
            }),
        },
    },
    extendedAnalysis: {
        /**
         *
         */
        byOrd: {
            alone: protectedProcedure
                .input(z.object({ experienceOrder: z.number() }))
                .query(async ({ ctx, input }) => {
                    const extendedAnalysis =
                        await ctx.db.extendedAnalysis.findFirst({
                            where: {
                                userId: ctx.session.user.id,
                                experience: { order: input.experienceOrder },
                            },
                        });

                    // Nullish will be used by front end

                    return extendedAnalysis;
                }),
            withExperience: protectedProcedure
                .input(z.object({ experienceOrder: z.number() }))
                .query(async ({ ctx, input }) => {
                    const extendedAnalysis =
                        await ctx.db.extendedAnalysis.findFirst({
                            where: {
                                userId: ctx.session.user.id,
                                experience: { order: input.experienceOrder },
                            },
                            include: { experience: true },
                        });

                    if (!extendedAnalysis) {
                        throw new TRPCError({ code: "NOT_FOUND" });
                    }

                    return extendedAnalysis;
                }),
            lowest: protectedProcedure.query(async ({ ctx }) => {
                const extendedAnalysis =
                    await ctx.db.extendedAnalysis.findFirst({
                        orderBy: [
                            { experience: { epoch: { order: "asc" } } },
                            { experience: { order: "asc" } },
                        ],
                        where: {
                            userId: ctx.session.user.id,
                            selected: true,
                        },
                    });

                return extendedAnalysis;
            }),
            highest: protectedProcedure.query(async ({ ctx }) => {
                const extendedAnalysis =
                    await ctx.db.extendedAnalysis.findFirst({
                        orderBy: [
                            { experience: { epoch: { order: "desc" } } },
                            { experience: { order: "desc" } },
                        ],
                        where: {
                            userId: ctx.session.user.id,
                            selected: true,
                        },
                    });

                return extendedAnalysis;
            }),
        },
        /**
         * By Id
         */
        byId: {
            /**
             *
             */
            alone: {},
            /**
             *
             */
            withAdjacent: protectedProcedure
                .input(z.object({ experienceId: z.string() }))
                .query(async ({ ctx, input }) => {
                    const extendedAnalysis =
                        await ctx.db.extendedAnalysis.findUnique({
                            where: {
                                userId: ctx.session.user.id,
                                experienceId: input.experienceId,
                            },
                            include: {
                                experience: {
                                    include: {
                                        epoch: {
                                            select: { order: true, id: true },
                                        },
                                    },
                                },
                            },
                        });

                    if (!extendedAnalysis) {
                        throw new TRPCError({ code: "NOT_FOUND" });
                    }

                    const previousAnalysis =
                        await ctx.db.extendedAnalysis.findFirst({
                            orderBy: [
                                { experience: { epoch: { order: "desc" } } },
                                { experience: { order: "desc" } },
                            ],
                            where: {
                                OR: [
                                    {
                                        // Whose experience is previous within the same epoch
                                        experience: {
                                            epoch: {
                                                order: extendedAnalysis
                                                    .experience.epoch.order, // WITHIN THE SAME EPOCH
                                            },
                                            order:
                                                extendedAnalysis.experience
                                                    .order - 1, // NEXT IN ORDER
                                        },
                                        userId: ctx.session.user.id,
                                        selected: true,
                                    },
                                    {
                                        // Whose experience is heighest in the next epoch
                                        experience: {
                                            epoch: {
                                                order:
                                                    extendedAnalysis.experience
                                                        .epoch.order - 1,
                                            },
                                        },
                                        userId: ctx.session.user.id,
                                        selected: true,
                                    },
                                ],
                            },
                        });

                    const nextAnalysis =
                        await ctx.db.extendedAnalysis.findFirst({
                            orderBy: [
                                { experience: { epoch: { order: "asc" } } },
                                { experience: { order: "asc" } },
                            ],
                            where: {
                                OR: [
                                    {
                                        // Whose experience is next within the same epoch
                                        experience: {
                                            epoch: {
                                                order: extendedAnalysis
                                                    .experience.epoch.order, // WITHIN THE SAME EPOCH
                                            },
                                            order:
                                                extendedAnalysis.experience
                                                    .order + 1, // NEXT IN ORDER
                                        },
                                        userId: ctx.session.user.id,
                                        selected: true,
                                    },
                                    {
                                        // Whose experience is lowest in the next epoch
                                        experience: {
                                            epoch: {
                                                order:
                                                    extendedAnalysis.experience
                                                        .epoch.order + 1,
                                            },
                                        },
                                        userId: ctx.session.user.id,
                                        selected: true,
                                    },
                                ],
                            },
                        });

                    return {
                        extendedAnalysis,
                        previousAnalysis,
                        nextAnalysis,
                    };
                }),
        },
    },

    futureAuthoring: {
        stage1: {
            all: protectedProcedure.query(async ({ ctx }) => {
                const futureAuthoring = await ctx.db.futureAuthoring.findUnique(
                    {
                        where: {
                            userId: ctx.session.user.id,
                        },
                    },
                );

                if (!futureAuthoring) {
                    const initializedFutureAuthoring =
                        await ctx.db.futureAuthoring.create({
                            data: {
                                userId: ctx.session.user.id,
                            },
                        });

                    return initializedFutureAuthoring;
                }

                return futureAuthoring;
            }),
        },
        stage2: {
            mainGoal: protectedProcedure.query(async ({ ctx }) => {
                const mainGoal = await ctx.db.goal.findFirst({
                    where: {
                        userId: ctx.session.user.id,
                        isMain: true,
                    },
                });

                if (!mainGoal) {
                    const initializedMainGoal = await ctx.db.goal.create({
                        data: {
                            userId: ctx.session.user.id,
                            isMain: true,
                            priority: 0,
                        },
                    });
                }

                return mainGoal;
            }),

            all: protectedProcedure.query(async ({ ctx }) => {
                const goals = await ctx.db.goal.findMany({
                    orderBy: { priority: "asc" },
                    where: {
                        userId: ctx.session.user.id,
                        isMain: false,
                    },
                });

                if (!goals.length) {
                    const initializedGoals = await ctx.db.goal.createMany({
                        data: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                            return {
                                isMain: false,
                                priority: i,
                                userId: ctx.session.user.id,
                            };
                        }),
                    });

                    const newlyInitializedGoals = await ctx.db.goal.findMany({
                        orderBy: { priority: "asc" },
                        where: {
                            userId: ctx.session.user.id,
                            isMain: false,
                        },
                    });

                    return newlyInitializedGoals;
                }

                return goals;
            }),
        },
    },

    orCreate: orCreateRouter,
});
