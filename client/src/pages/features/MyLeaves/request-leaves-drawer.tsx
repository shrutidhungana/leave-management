// RequestLeaveSheet.tsx
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Form } from "@/components/common/form";
import { requestLeaveControls } from "@/config/leave";
import { useLeaves } from "@/hooks/useLeaves";
import { format } from "date-fns";



type DateRange = { from: Date | null; to: Date | null };

type Props = {
  userId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: {
    id: number;
    startDate: string;
    endDate: string;
    reason: string;
    remarks?: string;
  } | null;
};

const RequestLeaveSheet: React.FC<Props> = ({
  userId,
  open,
  setOpen,
  mode,
  initialData,
}) => {
  const { requestLeaveMutation, updateLeaveMutation } = useLeaves(userId);

  // Default values for the form
  const defaultValues = initialData
    ? {
        date: {
          from: new Date(initialData.startDate),
          to: new Date(initialData.endDate),
        },
        reason: initialData.reason,
        remarks: initialData.remarks || "",
      }
    : {
        date: { from: null, to: null },
        reason: "",
        remarks: "",
      };

  const handleSubmit = (values: any) => {
    const { date, reason, remarks } = values;

    // Defensive check for valid date range
    if (!date?.from || !date?.to) {
      return alert("Please select a valid date range");
    }

    const payload = {
      userId: parseInt(userId, 10),
      startDate: format(date.from, "yyyy-MM-dd"),
      endDate: format(date.to, "yyyy-MM-dd"),
      reason,
      remarks,
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
      <SheetContent
        side="right"
        className="w-[400px] bg-gray-100 rounded-xl shadow-2xl p-6 border border-gray-200"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-extrabold text-orange-500">
            {mode === "edit" ? "Edit Leave" : "Request Leave"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-2 mb-4 h-px bg-gray-300 w-full" />

        <Form
          controls={requestLeaveControls}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          submitText={mode === "edit" ? "Update Leave" : "Submit Request"}
          isSubmitting={
            requestLeaveMutation.isLoading || updateLeaveMutation.isLoading
          }
        />
      </SheetContent>
    </Sheet>
  );
};

export default RequestLeaveSheet;
