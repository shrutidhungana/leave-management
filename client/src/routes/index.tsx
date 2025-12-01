// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignupPage from "@/pages/auth/signup";
import LoginPage from "@/pages/auth/login";
import DashboardWrapper from "@/pages/features/dashboard/dashboard-wrapper";
import AuthenticatedLayout from "@/components/auth/authenticated-layout";
import AllLeaves from "@/pages/features/all-leaves/leaves";
import MyLeavesWrapper from "@/pages/features/MyLeaves/my-leaves-wrapper";
import LandingPage from "@/pages";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
        <MyLeavesWrapper />
      </AuthenticatedLayout>
    ),
  },
  {
    path: "/leaves",
    element: (
      <AuthenticatedLayout>
        <AllLeaves />
      </AuthenticatedLayout>
    ),
  },
]);
