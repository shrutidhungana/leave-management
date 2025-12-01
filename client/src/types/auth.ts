// src/types/auth.ts
export interface User {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: {
    role(arg0: string, role: any): unknown;
    id: number;
    name?: string;
    email: string;
  };
  token: string;
}

export type FormControl = {
  label: string;
  name: string;
  placeholder?: string;
  componentType: "input" | "select" | "textarea" | "date";
  type?: string;
  options?: { id: string; label: string }[];
};

export type FormProps<T> = {
  formControls: FormControl[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
  isBtnDisabled?: boolean;
};

export type SignupData = {
  name?: string;
  email: string;
  password: string;
};
