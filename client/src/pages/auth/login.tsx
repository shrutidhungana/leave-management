
import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import { Form } from "@/components/common/form";
import { loginFormControls } from "@/config/auth";
import { useLogin } from "@/hooks/useAuth";
import type { SignupData } from "@/types/auth";
import { Link } from "react-router-dom"; 

export default function LoginPage() {
  const [defaultValues] = useState<SignupData>({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleLogin = async (values: SignupData) => {
    loginMutation.mutate(values);
  };

  return (
    <AuthLayout
      title="Login into Your Account"
      subtitle="Welcome back! Please enter your details to continue"
    >
      <Form<SignupData>
        controls={loginFormControls}
        defaultValues={defaultValues}
        onSubmit={handleLogin}
        submitText={loginMutation.isLoading ? "Logging In..." : "Log In"}
        isSubmitting={loginMutation.isLoading}
      />

     
      <p className="mt-6 text-center text-sm text-muted-foreground dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-orange-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
