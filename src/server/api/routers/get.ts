import { z } from "zod";

import {
    adminProcedure,
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { orCreateRouter } from "./getOrCreate";
import { TRPCError } from "@trpc/server";

export const getRouter = createTRPCRouter({
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
                    orderBy: { experience: { order: "asc" } },
                    include: { experience: true },
                });
            }),
        },
    },
    extendedAnalysis: {
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

                    // Nullish will be used by front end

                    return extendedAnalysis;
                }),
        },
    },

    orCreate: orCreateRouter,
});
