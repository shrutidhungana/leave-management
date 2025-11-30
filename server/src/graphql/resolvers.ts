import { db } from "../db/drizzle";
import { users, leaves } from "../db/schema";
import { eq } from "drizzle-orm";

export const resolvers = {
  Leave: {
    user: async (parent: any) => {
      const [u] = await db
        .select()
        .from(users)
        .where(eq(users.id, parent.userId));
      return u;
    },
  },

  Query: {
    leaves: async () => db.select().from(leaves),
    myLeaves: async (_: any, { userId }: any) =>
      db.select().from(leaves).where(eq(leaves.userId, userId)),
  },

  Mutation: {
    requestLeave: async (_: any, { userId, date, reason }: any) => {
      const [inserted] = await db
        .insert(leaves)
        .values({ userId, date, reason })
        .returning();
      return inserted;
    },

    updateLeave: async (_: any, { id, userId, date, reason }: any) => {
      const existing = await db.select().from(leaves).where(eq(leaves.id, id));
      if (!existing[0] || existing[0].userId !== userId)
        throw new Error("Not authorized");

      const [updated] = await db
        .update(leaves)
        .set({ date, reason })
        .where(eq(leaves.id, id))
        .returning();

      return updated;
    },

    deleteLeave: async (_: any, { id, userId }: any) => {
      const existing = await db.select().from(leaves).where(eq(leaves.id, id));
      if (!existing[0] || existing[0].userId !== userId)
        throw new Error("Not authorized");

      await db.delete(leaves).where(eq(leaves.id, id));
      return true;
    },
  },
};
