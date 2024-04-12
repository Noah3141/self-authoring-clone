import { z } from "zod";

import {
    adminProcedure,
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { orCreateRouter } from "./getOrCreate";

export const getRouter = createTRPCRouter({
    users: {
        all: adminProcedure.query(async ({ ctx }) => {
            return await ctx.db.user.findMany({ include: { sessions: true } });
        }),
    },

    orCreate: orCreateRouter,
});
