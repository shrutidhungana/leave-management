import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export const deleteUserSchema = z.object({
  id: z.number().int().positive("User ID must be a positive integer"),
});

export const requestLeaveSchema = z.object({
  userId: z.number().int().positive(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  reason: z.string().max(255).optional(),
});

export const updateLeaveSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .optional(),
  reason: z.string().max(255).optional(),
});

export const deleteLeaveSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
});
