// config/requestLeaveForm.ts
import { FormControlType } from "@/components/common/form";

export const requestLeaveControls: FormControlType[] = [
  {
    name: "date",
    label: "Leave Date",
    placeholder: "Select a date",
    componentType: "date",
  },
  {
    name: "reason",
    label: "Reason",
    placeholder: "Enter reason",
    componentType: "input",
  },
  {
    name: "remarks",
    label: "Remarks",
    placeholder: "Any additional remarks",
    componentType: "textarea",
  },
];
