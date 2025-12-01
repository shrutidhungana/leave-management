import { db } from "../db/drizzle";
import { users, leaves } from "../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword, generateToken } from "../helpers/auth";
import { format } from "date-fns";

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
    users: async (_: any, __: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser || currentUser.role !== "admin")
        throw new Error("Not authorized");
      return db.select().from(users);
    },

    leaves: async () => db.select().from(leaves),

    myLeaves: async (_: any, { userId }: any) => {
      return db.select().from(leaves).where(eq(leaves.userId, userId));
    },
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const { name, email, password, role } = args;
      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (existing) throw new Error("Email already registered");

      const hashed = await hashPassword(password);

      await db
        .insert(users)
        .values({ name, email, password: hashed, ...(role ? { role } : {}) });

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      const token = generateToken(user);

      return { user, token };
    },

    login: async (_: any, { email, password }: any) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!user) throw new Error("Invalid email or password");

      const match = await comparePassword(password, user.password);
      if (!match) throw new Error("Invalid email or password");

      const token = generateToken(user);
      return { user, token };
    },

    logout: async (_: any, __: any, context: any) => {
      if (!context.currentUser) throw new Error("Not authorized");
      // For JWT-based auth, logout is usually handled client-side by deleting token
      return { message: "Logged out successfully" };
    },

    createUser: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser || currentUser.role !== "admin")
        throw new Error("Not authorized");

      const { name, email, role } = args;
      const hashed = await hashPassword("defaultPassword123"); // default password

      const [user] = await db
        .insert(users)
        .values({ name, email, password: hashed, role: role || "employee" })
        .returning();

      return { message: "User created successfully", user };
    },

    deleteUser: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser || currentUser.role !== "admin")
        throw new Error("Not authorized");

      const { id } = args;

      const existing = await db.select().from(users).where(eq(users.id, id));
      if (!existing[0]) throw new Error("User not found");

      // Delete all leaves of the user first
      await db.delete(leaves).where(eq(leaves.userId, id));
      await db.delete(users).where(eq(users.id, id));

      return { message: "User and related leaves deleted successfully" };
    },

    requestLeave: async (_: any, args: any, context: any) => {
  const { userId, startDate, endDate, reason, remarks } = args;
  const currentUser = context.currentUser;
  if (!currentUser || currentUser.id !== userId)
    throw new Error("Not authorized");

  // Convert to 'YYYY-MM-DD' format
  const start = format(new Date(startDate), "yyyy-MM-dd");
      const end = format(new Date(endDate), "yyyy-MM-dd");

  const [inserted] = await db.insert(leaves)
    .values({
      userId,
      startDate: start,
      endDate: end,
      reason,
      remarks,
    })
    .returning();

  return { message: "Leave requested successfully", leave: inserted };
},

   updateLeave: async (_: any, args: any, context: any) => {
  const { id, userId, startDate, endDate, reason, remarks } = args;
  const currentUser = context.currentUser;
  if (!currentUser || currentUser.id !== userId)
    throw new Error("Not authorized");

  const existing = await db.select().from(leaves).where(eq(leaves.id, id));
  if (!existing[0]) throw new Error("Leave not found");

  const updatedStart = startDate ? format(new Date(startDate), "yyyy-MM-dd") : undefined;
  const updatedEnd = endDate ? format(new Date(endDate), "yyyy-MM-dd") : undefined;

  const [updated] = await db.update(leaves)
    .set({
      startDate: updatedStart,
      endDate: updatedEnd,
      reason,
      remarks,
    })
    .where(eq(leaves.id, id))
    .returning();

  return { message: "Leave updated successfully", leave: updated };
},

    deleteLeave: async (_: any, args: any, context: any) => {
      const { id, userId } = args;
      const currentUser = context.currentUser;
      if (!currentUser || currentUser.id !== userId)
        throw new Error("Not authorized");

      await db.delete(leaves).where(eq(leaves.id, id));
      return { message: "Leave deleted successfully" };
    },
  },
};
