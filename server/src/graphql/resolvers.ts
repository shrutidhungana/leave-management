import { db } from "../db/drizzle";
import { users, leaves } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  createUserSchema,
  deleteUserSchema,
  requestLeaveSchema,
  updateLeaveSchema,
  deleteLeaveSchema,
} from "./validators";

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
    users: async () => db.select().from(users),
    leaves: async () => db.select().from(leaves),
    myLeaves: async (_: any, { userId }: any) =>
      db.select().from(leaves).where(eq(leaves.userId, userId)),
  },

  Mutation: {
    // --------------- USERS -----------------
    createUser: async (_: any, args: any) => {
      const { name, email } = createUserSchema.parse(args);

      const [user] = await db.insert(users).values({ name, email }).returning();

      return {
        message: "User created successfully",
        user,
      };
    },

    deleteUser: async (_: any, args: any) => {
      const { id } = deleteUserSchema.parse(args);

      const existing = await db.select().from(users).where(eq(users.id, id));
      if (!existing[0]) throw new Error("User not found");

      // Delete all leaves of the user first
      await db.delete(leaves).where(eq(leaves.userId, id));
      await db.delete(users).where(eq(users.id, id));

      return { message: "User and related leaves deleted successfully" };
    },

    // --------------- LEAVES -----------------
    requestLeave: async (_: any, args: any) => {
      const { userId, date, reason } = requestLeaveSchema.parse(args);

      const [user] = await db.select().from(users).where(eq(users.id, userId));
      if (!user) throw new Error("User not found");

      const [inserted] = await db
        .insert(leaves)
        .values({ userId, date: new Date(date).toISOString(), reason })
        .returning();

      return { message: "Leave requested successfully", leave: inserted };
    },

    updateLeave: async (_: any, args: any) => {
      const { id, userId, date, reason } = updateLeaveSchema.parse(args);

      const existing = await db.select().from(leaves).where(eq(leaves.id, id));
      if (!existing[0]) throw new Error("Leave not found");
      if (existing[0].userId !== userId) throw new Error("Not authorized");

      const [updated] = await db
        .update(leaves)
        .set({ date: date ? new Date(date).toISOString() : undefined, reason })
        .where(eq(leaves.id, id))
        .returning();

      return { message: "Leave updated successfully", leave: updated };
    },

    deleteLeave: async (_: any, args: any) => {
      const { id, userId } = deleteLeaveSchema.parse(args);

      const existing = await db.select().from(leaves).where(eq(leaves.id, id));
      if (!existing[0]) throw new Error("Leave not found");
      if (existing[0].userId !== userId) throw new Error("Not authorized");

      await db.delete(leaves).where(eq(leaves.id, id));
      return { message: "Leave deleted successfully" };
    },
  },
};
