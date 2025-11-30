import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.all("/graphql", (c) => yoga.handle(c.req.raw));

serve({ fetch: app.fetch, port }, (info: { port: number }) => {
  console.log(`🚀 Server running at http://localhost:${info.port}/graphql`);
});
