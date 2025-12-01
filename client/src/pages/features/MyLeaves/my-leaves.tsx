
import { useState } from "react";
import { CustomTable } from "../../../components/leaves/table";
import { useLeaves } from "../../../hooks/useLeaves";
import RequestLeaveSheet from "./request-leaves-drawer";
import DeleteModal from "@/components/leaves/modals/DeleteModal";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";

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
      header: "Date",
      accessorKey: "date",
      cell: (info: any) => format(new Date(info.getValue()), "dd MMM yyyy"),
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">My Leaves</h2>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => {
            setEditLeave(null); // ensure fresh form
            setDrawerOpen(true);
          }}
        >
          Request Leave
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


