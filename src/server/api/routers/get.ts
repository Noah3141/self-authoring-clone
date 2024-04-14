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


    /**
     * Get multiple experiences
     */
    experiences: {
        //
    },

    orCreate: orCreateRouter,
});
