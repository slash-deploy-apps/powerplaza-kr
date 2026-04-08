import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';


/**
 * Multi-project schema prefix helper
 */

// Posts example table
export const posts = sqliteTable(
  'post',
  (d) => ({
    id: d.integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    createdById: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id),
    createdAt: d
      .integer({ mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index('created_by_idx').on(t.createdById),
    index('name_idx').on(t.name),
  ],
);

// Better Auth core tables
export const user = sqliteTable('user', (d) => ({
  id: d
    .text({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text({ length: 255 }),
  email: d.text({ length: 255 }).notNull().unique(),
  emailVerified: d.integer({ mode: 'boolean' }).default(false),
  image: d.text({ length: 255 }),
  createdAt: d
    .integer({ mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: d.integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
}));

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  session: many(session),
}));

export const account = sqliteTable(
  'account',
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id),
    accountId: d.text({ length: 255 }).notNull(),
    providerId: d.text({ length: 255 }).notNull(),
    accessToken: d.text(),
    refreshToken: d.text(),
    accessTokenExpiresAt: d.integer({ mode: 'timestamp' }),
    refreshTokenExpiresAt: d.integer({ mode: 'timestamp' }),
    scope: d.text({ length: 255 }),
    idToken: d.text(),
    password: d.text(),
    createdAt: d
      .integer({ mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
  }),
  (t) => [index('account_user_id_idx').on(t.userId)],
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const session = sqliteTable(
  'session',
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id),
    token: d.text({ length: 255 }).notNull().unique(),
    expiresAt: d.integer({ mode: 'timestamp' }).notNull(),
    ipAddress: d.text({ length: 255 }),
    userAgent: d.text({ length: 255 }),
    createdAt: d
      .integer({ mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
  }),
  (t) => [index('session_user_id_idx').on(t.userId)],
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const verification = sqliteTable(
  'verification',
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    identifier: d.text({ length: 255 }).notNull(),
    value: d.text({ length: 255 }).notNull(),
    expiresAt: d.integer({ mode: 'timestamp' }).notNull(),
    createdAt: d
      .integer({ mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
  }),
  (t) => [index('verification_identifier_idx').on(t.identifier)],
);


// PowerPlaza: Categories
export const categories = sqliteTable('powerplaza_categories', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameEn: text('name_en'),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// PowerPlaza: Products
export const products = sqliteTable('powerplaza_products', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameEn: text('name_en'),
  modelNo: text('model_no').notNull(),
  categoryId: text('category_id').notNull().references(() => categories.id),
  description: text('description'),
  imageUrl: text('image_url'),
  specs: text('specs'),
  specInputVoltage: text('spec_input_voltage'),
  specOutputVoltage: text('spec_output_voltage'),
  specPowerW: text('spec_power_w'),
  specFormFactor: text('spec_form_factor'),
  certifications: text('certifications'),
  features: text('features'),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
});

export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// PowerPlaza: Inquiries
export const inquiries = sqliteTable('powerplaza_inquiries', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  productId: text('product_id'),
  productName: text('product_name'),
  name: text('name').notNull(),
  company: text('company').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  quantity: text('quantity'),
  message: text('message').notNull(),
  status: text('status').default('new'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});