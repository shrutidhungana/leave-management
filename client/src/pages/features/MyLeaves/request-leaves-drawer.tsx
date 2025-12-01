

import React from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Form } from "@/components/common/form";
import { requestLeaveControls } from "@/config/leave";
import { useLeaves } from "@/hooks/useLeaves";

type Props = {
  userId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: any | null;
};

const RequestLeaveSheet: React.FC<Props> = ({
  userId,
  open,
  setOpen,
  mode,
  initialData,
}) => {
  const { requestLeaveMutation, updateLeaveMutation } = useLeaves(userId);

  const defaultValues = initialData
    ? {
        date: new Date(initialData.date),
        reason: initialData.reason,
        remarks: initialData.remarks || "",
      }
    : { date: undefined, reason: "", remarks: "" };

  const handleSubmit = (values: any) => {
    const payload = {
      userId: parseInt(userId),
      date: values.date.toISOString(),
      reason: values.reason,
      remarks: values.remarks,
    };

    if (mode === "edit" && initialData) {
      updateLeaveMutation.mutate(
        { ...payload, id: Number(initialData.id) },
        { onSuccess: () => setOpen(false) }
      );
    } else {
      requestLeaveMutation.mutate(payload, {
        onSuccess: () => setOpen(false),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[400px] p-6">
        <SheetHeader>
          <SheetTitle>
            {mode === "edit" ? "Edit Leave" : "Request Leave"}
          </SheetTitle>
        </SheetHeader>

        <Form
          controls={requestLeaveControls}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          submitText={mode === "edit" ? "Update Leave" : "Submit Request"}
          isSubmitting={
            requestLeaveMutation.isLoading ||
            updateLeaveMutation.isLoading
          }
        />
      </SheetContent>
    </Sheet>
  );
};

export default RequestLeaveSheet;
