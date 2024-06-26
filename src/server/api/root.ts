import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { epochRouter } from "./routers/epoch";
import { experienceRouter } from "./routers/experience";
import { extendedAnalysisRouter } from "./routers/extendedAnalysis";
import { userRouter } from "./routers/user";
import { suiteRouter } from "./routers/suite";
import { getRouter } from "./routers/get";
import { updateRouter } from "./routers/update";
import { deleteRouter } from "./routers/delete";
import { createRouter } from "./routers/create";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    epoch: epochRouter,
    user: userRouter,
    experience: experienceRouter,
    suite: suiteRouter,
    extendedAnalysis: extendedAnalysisRouter,

    get: getRouter,
    delete: deleteRouter,
    create: createRouter,
    update: updateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
