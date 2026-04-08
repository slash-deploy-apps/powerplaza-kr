import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import { products } from '~/server/db/schema';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { eq, and, like, asc, sql } from 'drizzle-orm';

const productInput = z.object({
  slug: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  modelNo: z.string(),
  categoryId: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  specs: z.string().optional(),
  specInputVoltage: z.string().optional(),
  specOutputVoltage: z.string().optional(),
  specPowerW: z.string().optional(),
  specFormFactor: z.string().optional(),
  certifications: z.string().optional(),
  features: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const productRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        search: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(12),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 12;
      const offset = (page - 1) * limit;

      const conditions = [eq(products.isPublished, true)];
      if (input?.categoryId) conditions.push(eq(products.categoryId, input.categoryId));
      if (input?.search) conditions.push(like(products.name, `%${input.search}%`));

      const rows = await ctx.db
        .select()
        .from(products)
        .where(and(...conditions))
        .orderBy(asc(products.sortOrder))
        .limit(limit)
        .offset(offset);

      const countResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(and(...conditions));
      const total = countResult[0]?.count ?? 0;

      return { items: rows, total, page, limit };
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [product] = await ctx.db
        .select()
        .from(products)
        .where(eq(products.slug, input.slug))
        .limit(1);
      return product ?? null;
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [product] = await ctx.db
        .select()
        .from(products)
        .where(eq(products.id, input.id))
        .limit(1);
      return product ?? null;
    }),

  featured: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(products)
      .where(and(eq(products.isFeatured, true), eq(products.isPublished, true)))
      .orderBy(asc(products.sortOrder))
      .limit(4);
  }),

  adminList: protectedProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;
      const offset = (page - 1) * limit;

      const rows = await ctx.db
        .select()
        .from(products)
        .orderBy(asc(products.sortOrder))
        .limit(limit)
        .offset(offset);

      const countResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(products);
      const total = countResult[0]?.count ?? 0;

      return { items: rows, total, page, limit };
    }),


  create: protectedProcedure
    .input(productInput)
    .mutation(async ({ ctx, input }) => {
      const id = createId();
      await ctx.db.insert(products).values({ id, ...input });
      return { id };
    }),

  update: protectedProcedure
    .input(productInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      await ctx.db.update(products).set(rest).where(eq(products.id, id));
      return { id };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(products).where(eq(products.id, input.id));
      return { id: input.id };
    }),
});