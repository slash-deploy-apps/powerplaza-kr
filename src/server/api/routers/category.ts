import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import { categories } from '~/server/db/schema';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { asc } from 'drizzle-orm';

export const categoryRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(categories).orderBy(asc(categories.sortOrder));
  }),
  create: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string(),
        nameEn: z.string().optional(),
        sortOrder: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = createId();
      await ctx.db.insert(categories).values({ id, ...input });
      return { id };
    }),
});