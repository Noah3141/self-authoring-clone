import { z } from "zod";
import crypto from "crypto";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    epochs: {
        all: protectedProcedure.query(async ({ ctx }) => {
            return await ctx.db.epoch.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
            });
        }),

        allWith: {},
    },

    checkExists: {
        byEmail: publicProcedure
            .input(z.object({ email: z.string() }))
            .query(async ({ ctx, input }) => {
                return {
                    exists: !!(await ctx.db.user.findUnique({
                        where: {
                            email: input.email,
                        },
                    })),
                };
            }),
    },

    get: {
        byId: protectedProcedure
            .input(z.object({ userId: z.string() }))
            .query(async ({ ctx, input }) => {
                return await ctx.db.user.findUnique({
                    where: {
                        id: input.userId,
                    },
                });
            }),
        byEmail: publicProcedure
            .input(z.object({ email: z.string() }))
            .query(async ({ ctx, input }) => {
                return await ctx.db.user.findUnique({
                    where: {
                        email: input.email,
                    },
                });
            }),
    },

    create: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const encryptedPassword = crypto
                .createHash("sha256")
                .update(input.password, "utf8")
                .digest("base64");

            await ctx.db.user.create({
                data: {
                    email: input.email,
                    password: encryptedPassword,
                },
            });

            return {
                created: true,
            };
        }),

    update: protectedProcedure
        .input(z.object({}))
        .mutation(async ({ ctx, input }) => {
            return;
        }),
});
