
import * as React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";


export type FormControlType = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  componentType: "input" | "textarea" | "select" | "date";
  options?: { id: string; label: string }[];
};

import { DefaultValues } from "react-hook-form";

type FormProps<T> = {
  controls: FormControlType[];
  onSubmit: (values: T) => void;
  defaultValues: DefaultValues<T>;
  submitText?: string;
  isSubmitting?: boolean;
};

export function Form<T extends Record<string, any>>({
  controls,
  onSubmit,
  defaultValues,
  submitText = "Submit",
  isSubmitting,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const renderField = (controlItem: FormControlType) => {
    switch (controlItem.componentType) {
      case "input":
        return (
          <Controller
            name={controlItem.name as any}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={controlItem.type || "text"}
                placeholder={controlItem.placeholder}
              />
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={controlItem.name as any}
            control={control}
            render={({ field }) => (
              <Textarea {...field} placeholder={controlItem.placeholder} />
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={controlItem.name as any}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={controlItem.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {controlItem.options?.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      case "date":
        return (
          <Controller
            name={controlItem.name as any}
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {field.value ? format(field.value, "PPP") : controlItem.placeholder}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {controls.map((c) => (
          <div key={c.name} className="flex flex-col gap-1">
            <Label>{c.label}</Label>
            {renderField(c)}
          </div>
        ))}

        <Button type="submit" className="w-full bg" disabled={isSubmitting}>
          {submitText}
        </Button>
      </form>
    </FormProvider>
  );
}

