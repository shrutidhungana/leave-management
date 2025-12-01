import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import { Form } from "@/components/common/form";
import { signupFormControls } from "@/config/auth";
import { useSignup } from "@/hooks/useAuth";
import type { SignupData } from "@/types/auth";
import { Link} from "react-router-dom"; 

export default function SignupPage() {
  const [defaultValues] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  const signupMutation = useSignup();

  const handleSignup = async (values: SignupData) => {
    signupMutation.mutate(values);
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join us and start your journey today"
    >
      <Form<SignupData>
        controls={signupFormControls}
        defaultValues={defaultValues}
        onSubmit={handleSignup}
        submitText={signupMutation.isLoading ? "Signing Up..." : "Sign Up"}
        isSubmitting={signupMutation.isLoading}
      />

     
      <p className="mt-6 text-center text-sm text-muted-foreground dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-orange-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

