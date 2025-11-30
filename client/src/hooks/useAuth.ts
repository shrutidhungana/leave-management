
import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/api";
import type { AuthResponse } from "../types/auth";
import { useToast } from "./useToast";
import { useNavigate } from "react-router-dom"; 

type SignupVariables = {
  name: string;
  email: string;
  password: string;
};

type LoginVariables = {
  email: string;
  password: string;
};

export const useSignup = () => {
    const { success, error } = useToast();
    const navigate = useNavigate();

  return useMutation<AuthResponse, Error, SignupVariables>({
    mutationFn: async (variables: SignupVariables) => {
      const query = `
        mutation Signup($name: String!, $email: String!, $password: String!) {
          signup(name: $name, email: $email, password: $password) {
            user { id, name, email }
            token
          }
        }
      `;

      const res = await api.post("", { query, variables });
      return res.data.data.signup as AuthResponse;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
        success("Signup successful!");
         navigate("/dashboard");
    },

    onError: (err) => error(err.message || "Signup failed"),
  });
};

export const useLogin = () => {
  const { success, error } = useToast();
   const navigate = useNavigate();

  return useMutation<AuthResponse, Error, LoginVariables>({
    mutationFn: async (variables: LoginVariables) => {
      const query = `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user { id, name, email }
            token
          }
        }
      `;

      const res = await api.post("", { query, variables });
      return res.data.data.login as AuthResponse;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      success("Login successful!");
      navigate("/dashboard");
    },

    onError: (err) => error(err.message || "Login failed"),
  });
};
