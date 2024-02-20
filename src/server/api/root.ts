import { chatPageRouter } from "@/server/api/routers/history";
import { chatMessageRouter } from "@/server/api/routers/message";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  chatPage: chatPageRouter,
  chatMessage: chatMessageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
