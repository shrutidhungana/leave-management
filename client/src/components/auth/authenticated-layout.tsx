import React from "react";
import Navbar from "../common/navbar";
import { navItems } from "@/config/nav";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar logoSrc="/logo.png" navItems={navItems} />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
