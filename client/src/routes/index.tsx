// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignupPage from "@/pages/auth/signup";
import LoginPage from "@/pages/auth/login";
import DashboardWrapper from "@/pages/features/dashboard/dashboard-wrapper";
import AuthenticatedLayout from "@/components/auth/authenticated-layout";
import Leaves from "@/pages/features/leaves";
import MyLeaves from "@/pages/features/my-leaves";


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
    element: (
      <AuthenticatedLayout>
        <DashboardWrapper />
      </AuthenticatedLayout>
    ),
  },
  {
    path: "/my-leaves",
    element: (
      <AuthenticatedLayout>
        <MyLeaves />
      </AuthenticatedLayout>
    ),
  },
  {
    path: "/leaves",
    element: (
      <AuthenticatedLayout>
        <Leaves />
      </AuthenticatedLayout>
    ),
  },
]);
