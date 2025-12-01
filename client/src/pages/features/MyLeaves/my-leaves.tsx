

import { useState } from "react";
import { CustomTable } from "../../../components/leaves/table";
import { useLeaves } from "../../../hooks/useLeaves";
import RequestLeaveSheet from "./request-leaves-drawer";
import DeleteModal from "@/components/leaves/modals/DeleteModal";
import * as dfnsTz from "date-fns-tz"; 
import { format } from "date-fns";
import { Edit, Trash2, Plus } from "lucide-react";

const NEPAL_TZ = "Asia/Kathmandu";

const MyLeavesTable = ({ userId }: { userId: string }) => {
  const { myLeavesQuery, deleteLeaveMutation } = useLeaves(userId);

  const leaves = myLeavesQuery.data || [];
  

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editLeave, setEditLeave] = useState<any | null>(null);

  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState<number | null>(null);

  const columns = [
    {
      header: "Date Range",
      accessorKey: "startDate",
      cell: (info: any) => {
        const row = info.row.original;

        const start = dfnsTz.toZonedTime(new Date(row.startDate), NEPAL_TZ);
        const end = dfnsTz.toZonedTime(new Date(row.endDate), NEPAL_TZ);

        return `${format(start, "dd-MMM-yyyy")} → ${format(end, "dd-MMM-yyyy")}`;
      },
    },
    {
      header: "Reason",
      accessorKey: "reason",
    },
    {
      header: "Remarks",
      accessorKey: "remarks",
      cell: (info: any) => info.getValue() || "—",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (info: any) => {
        const row = info.row.original;

        return (
          <div className="flex gap-3">
            {/* EDIT */}
            <Edit
              className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setEditLeave(row);
                setDrawerOpen(true);
              }}
            />

            {/* DELETE */}
            <Trash2
              className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLeaveId(Number(row.id));
                setDeleteModalOpen(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            My Leaves
          </h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            View, edit, or request your leaves here
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 
               text-white font-semibold rounded-xl shadow-md hover:from-indigo-700 hover:to-indigo-600 
               transition duration-300 ease-in-out"
          onClick={() => {
            setEditLeave(null); // ensure fresh form
            setDrawerOpen(true);
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Request Leave</span>
        </button>
      </div>

      <CustomTable columns={columns} data={leaves} />

      {/* CREATE / EDIT SHEET */}
      <RequestLeaveSheet
        userId={userId}
        open={drawerOpen}
        setOpen={setDrawerOpen}
        mode={editLeave ? "edit" : "create"}
        initialData={editLeave}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Leave?"
        question="Are you sure you want to delete this leave?"
        additionalText="This action cannot be undone."
        onConfirm={() => {
          if (selectedLeaveId) {
            deleteLeaveMutation.mutate(selectedLeaveId, {
              onSuccess: () => {
                setDeleteModalOpen(false);
                setSelectedLeaveId(null);
              },
            });
          }
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default MyLeavesTable;


