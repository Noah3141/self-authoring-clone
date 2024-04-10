import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
    futureAuthoringWordCount,
    pastAuthoringWordCount,
    wordCount,
} from "~/utils/authoring";
import { createCaller } from "../root";
import { PastAuthoring } from "@prisma/client";

export const GetSuiteSchema = z.object({ suiteId: z.string() });
export type GetSuiteOpts = z.infer<typeof GetSuiteSchema>;

export const UpdateSuiteSchema = z.object({});
export type UpdateSuiteOpts = z.infer<typeof UpdateSuiteSchema>;

export const suiteRouter = createTRPCRouter({
    get: {
        /** Operations concerning just pastAuthoring */
        pastAuthoring: protectedProcedure.query(async ({ ctx }) => {
            const pastAuthoring = await ctx.db.pastAuthoring.findUnique({
                where: {
                    userId: ctx.session.user.id,
                },
                include: {
                    epochs: {
                        include: {
                            experiences: {
                                include: {
                                    extendedAnalysis: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!pastAuthoring) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return pastAuthoring;
        }),

        /** Operations concerning just futureAuthoring */
        futureAuthoring: protectedProcedure.query(async ({ ctx }) => {
            const futureAuthoring = await ctx.db.futureAuthoring.findUnique({
                where: { userId: ctx.session.user.id },
                include: {
                    goals: true,
                },
            });

            if (!futureAuthoring) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }
        }),

        /** Operations concerning both */
        all: protectedProcedure.query(async ({ ctx }) => {
            const pastAuthoring = await ctx.db.pastAuthoring.findUnique({
                where: {
                    userId: ctx.session.user.id,
                },
                include: {
                    epochs: {
                        include: {
                            experiences: {
                                include: {
                                    extendedAnalysis: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!pastAuthoring) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const futureAuthoring = await ctx.db.futureAuthoring.findUnique({
                where: { userId: ctx.session.user.id },
                include: {
                    goals: true,
                },
            });

            if (!futureAuthoring) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return {
                futureAuthoring,
                pastAuthoring,
            };
        }),
    },

    wordCounts: {
        all: protectedProcedure.query(async ({ ctx }) => {
            const pastAuthoring = await ctx.db.pastAuthoring.findUnique({
                where: {
                    userId: ctx.session.user.id,
                },
                include: {
                    epochs: {
                        include: {
                            experiences: {
                                include: {
                                    extendedAnalysis: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!pastAuthoring) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const futureAuthoring = await ctx.db.futureAuthoring.findUnique({
                where: { userId: ctx.session.user.id },
                include: {
                    goals: true,
                },
            });

            if (!futureAuthoring) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return {
                futureAuthoring: {
                    wordCount: wordCount(
                        futureAuthoring.careerLife,
                        futureAuthoring.familyLife,
                        futureAuthoring.idealFuture,
                        futureAuthoring.improveYourHabits,
                        futureAuthoring.leisureLife,
                        futureAuthoring.oneThingYouCouldDoBetter,
                        futureAuthoring.qualitiesYouAdmire,
                        futureAuthoring.socialLife,
                        futureAuthoring.thingsToLearnAbout,
                        futureAuthoring.worstFuture,
                        ...futureAuthoring.goals
                            .map((goal): string[] => {
                                return [
                                    goal.description,
                                    goal.impactAnalysis,
                                    goal.motiveAnalysis,
                                    goal.obstacleAnalysis,
                                    goal.strategicAnalysis,
                                ];
                            })
                            .reduce((a, b): string[] => a.concat(b)),
                    ),
                },
                pastAuthoring: {
                    wordCount: pastAuthoring.epochs
                        .map((epoch): number => {
                            return (
                                epoch?.experiences
                                    .map((experience) =>
                                        wordCount(
                                            experience?.description,
                                            experience?.basicAnalysis,
                                            experience?.extendedAnalysis
                                                ?.effectAnalysis,
                                            experience?.extendedAnalysis
                                                ?.eventAnalysis,
                                        ),
                                    )
                                    .reduce((a, b) => a + b) ?? 0
                            );
                        })
                        .reduce((a, b): number => a + b),
                },
            };
        }),
    },

    update: protectedProcedure
        .input(UpdateSuiteSchema)
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
