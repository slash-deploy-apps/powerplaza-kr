import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import { inquiries } from '~/server/db/schema';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { eq, desc, and, sql } from 'drizzle-orm';

export const inquiryRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        company: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        quantity: z.string().optional(),
        message: z.string().min(1),
        productId: z.string().optional(),
        productName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = createId();
      await ctx.db.insert(inquiries).values({ id, ...input });
      return { id };
    }),

  list: protectedProcedure
    .input(
      z.object({
        status: z.enum(['new', 'read', 'replied']).optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;
      const offset = (page - 1) * limit;

      const conditions = input?.status ? [eq(inquiries.status, input.status)] : [];

      const rows = await ctx.db
        .select()
        .from(inquiries)
        .where(conditions.length ? and(...conditions) : undefined)
        .orderBy(desc(inquiries.createdAt))
        .limit(limit)
        .offset(offset);

      return rows;
    }),

  markRead: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(['new', 'read', 'replied']) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(inquiries).set({ status: input.status }).where(eq(inquiries.id, input.id));
      return { id: input.id };
    }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    const total = await ctx.db.select({ count: sql<number>`count(*)` }).from(inquiries);
    const newCount = await ctx.db.select({ count: sql<number>`count(*)` }).from(inquiries).where(eq(inquiries.status, 'new'));
    return {
      total: total[0]?.count ?? 0,
      newCount: newCount[0]?.count ?? 0,
    };
  }),
});