
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";
import dotenv from "dotenv";
import { verifyToken } from "./helpers/auth";
import { db } from "./db/drizzle";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { cors } from "hono/cors";

dotenv.config();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",

  context: async ({ request }) => {
    const auth = request.headers.get("authorization");
    if (!auth) return { currentUser: null };

    const token = auth.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) return { currentUser: null };

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId));
    return { currentUser: user || null };
  },
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.all("/graphql", (c) => yoga.handle(c.req.raw));

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🚀 Server running at http://localhost:${info.port}/graphql`);
});
