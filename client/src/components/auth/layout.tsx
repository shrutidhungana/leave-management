
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-12 backdrop-blur-sm animate-fadeIn">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-orange-600 dark:text-blue-400 tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
