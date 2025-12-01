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
      user { id, name, email, role }
      token
    }
  }
`;

      const res = await api.post("", { query, variables });
      return res.data.data.signup as AuthResponse;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);
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
      user { id, name, email, role }
      token
    }
  }
`;

      const res = await api.post("", { query, variables });
      return res.data.data.login as AuthResponse;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);
      success("Login successful!");
      navigate("/dashboard");
    },

    onError: (err) => error(err.message || "Login failed"),
  });
};

export const useLogout = () => {
  const { success, error } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const query = `
        mutation {
          logout {
            message
          }
        }
      `;
      const res = await api.post("", { query });
      return res.data.data.logout;
    },

    onSuccess: (data) => {
     
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");

      success(data.message || "Logged out successfully");

      // Redirect to root
      navigate("/");
    },

    onError: (err: any) => {
      error(err.message || "Logout failed");
    },
  });
};

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId"); 

  return { token, role, userId };
};