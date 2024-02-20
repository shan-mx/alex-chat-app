import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const chatMessageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1),
        sender: z.string().min(1),
        chatPageId: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.chatMessage.create({
        data: {
          content: input.content,
          sender: input.sender,
          chatPage: {
            connect: {
              id: input.chatPageId,
            },
          },
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.chatMessage.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
