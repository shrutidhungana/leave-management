import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "./resolvers";

const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Leave {
    id: ID!
    user: User!
    date: String!
    reason: String
  }

  type Query {
    leaves: [Leave!]!
    myLeaves(userId: Int!): [Leave!]!
  }

  type Mutation {
    requestLeave(userId: Int!, date: String!, reason: String): Leave!
    updateLeave(id: Int!, userId: Int!, date: String, reason: String): Leave!
    deleteLeave(id: Int!, userId: Int!): Boolean!
  }
`;

// Merge typeDefs + resolvers into a single schema
export const schema = createSchema({
  typeDefs,
  resolvers,
});
