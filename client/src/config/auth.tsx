
import { FormControl } from "@/types/auth";

export const signupFormControls: FormControl[] = [
  {
    label: "Full Name",
    name: "name",
    placeholder: "Enter your full name",
    type: "text",
    componentType: "input",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const loginFormControls: FormControl[] = [
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];
