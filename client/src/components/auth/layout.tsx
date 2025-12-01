import React, { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-gray-100 rounded-2xl p-12 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0B3D91]">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-sky-500">{subtitle}</p>}
        </div>

        
        <div className="space-y-6">{children}</div>

      </div>
    </div>
  );
}
