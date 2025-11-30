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
import { hashPassword, comparePassword, generateToken } from "../helpers/auth";

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
      if (!currentUser) throw new Error("Not authorized");
      
      if (currentUser.role !== "admin") throw new Error("Not authorized");
      return db.select().from(users);
    },
    leaves: async () => db.select().from(leaves),
    myLeaves: async (_: any, { userId }: any) =>
      db.select().from(leaves).where(eq(leaves.userId, userId)),
  },

  Mutation: {
    signup: async (_: any, args: any) => {
  try {
    const { name, email, password, role } = args;

    
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashed = await hashPassword(password);

   
    await db.insert(users).values({
      name,
      email,
      password: hashed,
      ...(role ? { role } : {}),
    });

    
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) throw new Error("Failed to create user");

    
    const token = generateToken(user.id);

    return { user, token };
  } catch (err: any) {
    console.error("Signup error:", err);
    throw new Error(err.message || "Signup failed");
  }
},


    login: async (_: any, { email, password }: any) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!user) throw new Error("Invalid email or password");

      const match = await comparePassword(password, user.password);
      if (!match) throw new Error("Invalid email or password");

      const token = generateToken(user.id);
      return { user, token };
    },

   
    createUser: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser) throw new Error("Not authorized");

     
      if (currentUser.role !== "admin") throw new Error("Not authorized");

      const { name, email } = createUserSchema.parse(args);
      const hashed = await hashPassword("defaultPassword123"); // default password
      const [user] = await db
        .insert(users)
        .values({ name, email, password: hashed, role: args.role || "employee" })
        .returning();

      return { message: "User created successfully", user };
    },

    deleteUser: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser) throw new Error("Not authorized");

      
      if (currentUser.role !== "admin") throw new Error("Not authorized");

      const { id } = deleteUserSchema.parse(args);

      const existing = await db.select().from(users).where(eq(users.id, id));
      if (!existing[0]) throw new Error("User not found");

      // Delete all leaves of the user first
      await db.delete(leaves).where(eq(leaves.userId, id));
      await db.delete(users).where(eq(users.id, id));

      return { message: "User and related leaves deleted successfully" };
    },

    
    requestLeave: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser) throw new Error("Not authorized");

      const { userId, date, reason, remarks } = requestLeaveSchema.parse(args);

      if (currentUser.id !== userId) throw new Error("Not authorized");

      const [inserted] = await db
        .insert(leaves)
        .values({ userId, date: new Date(date).toISOString(), reason, remarks })
        .returning();

      return { message: "Leave requested successfully", leave: inserted };
    },

    updateLeave: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser) throw new Error("Not authorized");

      const { id, userId, date, reason, remarks } =
        updateLeaveSchema.parse(args);

      if (currentUser.id !== userId) throw new Error("Not authorized");

      const existing = await db.select().from(leaves).where(eq(leaves.id, id));
      if (!existing[0]) throw new Error("Leave not found");

      const [updated] = await db
        .update(leaves)
        .set({
          date: date ? new Date(date).toISOString() : undefined,
          reason,
          remarks,
        })
        .where(eq(leaves.id, id))
        .returning();

      return { message: "Leave updated successfully", leave: updated };
    },

    deleteLeave: async (_: any, args: any, context: any) => {
      const currentUser = context.currentUser;
      if (!currentUser) throw new Error("Not authorized");

      const { id, userId } = deleteLeaveSchema.parse(args);

      if (currentUser.id !== userId) throw new Error("Not authorized");

      const existing = await db.select().from(leaves).where(eq(leaves.id, id));
      if (!existing[0]) throw new Error("Leave not found");

      await db.delete(leaves).where(eq(leaves.id, id));
      return { message: "Leave deleted successfully" };
    },
  },
};
