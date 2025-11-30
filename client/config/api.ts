import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});
