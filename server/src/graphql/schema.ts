// graphql/schema.ts
import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Leave {
    id: ID!
    user: User!
    date: String!
    reason: String
    remarks: String
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

  type AuthResponse {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    leaves: [Leave!]!
    myLeaves(userId: Int!): [Leave!]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    signup(
      name: String!
      email: String!
      password: String!
      role: String
    ): AuthResponse!
    createUser(name: String!, email: String!, role: String): UserResponse!
    deleteUser(id: Int!): MessageResponse!

    requestLeave(
      userId: Int!
      date: String!
      reason: String
      remarks: String
    ): LeaveResponse!
    updateLeave(
      id: Int!
      userId: Int!
      date: String
      reason: String
      remarks: String
    ): LeaveResponse!
    deleteLeave(id: Int!, userId: Int!): MessageResponse!

    logout: MessageResponse!
  }
`;

export const schema = createSchema({
  typeDefs,
  resolvers,
});
