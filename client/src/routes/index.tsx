// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignupPage from "@/pages/auth/signup";
import LoginPage from "@/pages/auth/login";
import Dashboard from "@/pages/features/dashboard";


export const routes = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);
