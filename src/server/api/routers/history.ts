import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const chatPageRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.chatPage.findUnique({
        where: { id: input.id },
        include: { messages: true },
      });
    }),

  create: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.chatPage.create({
      data: {
        title: "New Chat Page",
        messages: {
          create: [],
        },
      },
    });
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.chatPage.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.chatPage.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
