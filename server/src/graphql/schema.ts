import { createSchema } from "graphql-yoga";
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

  type UserResponse {
    message: String!
    user: User
  }

  type LeaveResponse {
    message: String!
    leave: Leave
  }

  type MessageResponse {
    message: String!
  }

  type Query {
    users: [User!]!
    leaves: [Leave!]!
    myLeaves(userId: Int!): [Leave!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): UserResponse!
    deleteUser(id: Int!): MessageResponse!
    requestLeave(userId: Int!, date: String!, reason: String): LeaveResponse!
    updateLeave(
      id: Int!
      userId: Int!
      date: String
      reason: String
    ): LeaveResponse!
    deleteLeave(id: Int!, userId: Int!): MessageResponse!
  }
`;

export const schema = createSchema({
  typeDefs,
  resolvers,
});
