import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
};

// Optional: get user by token
export const getUserFromToken = async (token: string) => {
  const payload = verifyToken(token);
  if (!payload) return null;
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId));
  return user || null;
};
