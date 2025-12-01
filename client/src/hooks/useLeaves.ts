import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../config/api";
import { useToast } from "./useToast";
import type { Leave } from "@/types/leave";

export const useLeaves = (userId: string) => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  // Fetch my leaves
  const myLeavesQuery = useQuery<Leave[], Error>({
    queryKey: ["myLeaves", userId],
    queryFn: async () => {
      const query = `
        query MyLeaves($userId: Int!) {
          myLeaves(userId: $userId) {
            id
            date
            reason
            remarks
            user { id name }
          }
        }
      `;
      const variables = { userId: parseInt(userId, 10) };
      const res = await api.post("", { query, variables });
      return res.data.data.myLeaves;
    },
    enabled: !!userId,
  });

  // Fetch all leaves
  const allLeavesQuery = useQuery<Leave[], Error>({
    queryKey: ["allLeaves"],
    queryFn: async () => {
      const query = `
        query {
          leaves {
            id
            date
            reason
            remarks
            user { id name }
          }
        }
      `;
      const res = await api.post("", { query });
      return res.data.data.leaves;
    },
  });

  // Request leave
  const requestLeaveMutation = useMutation({
    mutationFn: async (leave: {
      userId: number;
      date: string;
      reason: string;
      remarks?: string;
    }) => {
      const mutation = `
        mutation RequestLeave($userId: Int!, $date: String!, $reason: String!, $remarks: String) {
          requestLeave(userId: $userId, date: $date, reason: $reason, remarks: $remarks) {
            message
            leave { id }
          }
        }
      `;
      const res = await api.post("", {
        query: mutation,
        variables: leave,
      });
      return res.data.data.requestLeave;
    },
    onSuccess: (data) => {
      success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myLeaves", userId] });
    },
    onError: (err: any) => {
      error(err.message || "Failed to request leave");
    },
  });

  // Update leave
  const updateLeaveMutation = useMutation({
    mutationFn: async (leave: {
      id: number;
      userId: number;
      date: string;
      reason: string;
      remarks?: string;
    }) => {
      const mutation = `
        mutation UpdateLeave($id: Int!, $userId: Int!, $date: String!, $reason: String!, $remarks: String) {
          updateLeave(id: $id, userId: $userId, date: $date, reason: $reason, remarks: $remarks) {
            message
            leave { id }
          }
        }
      `;
      const res = await api.post("", { query: mutation, variables: leave });
      return res.data.data.updateLeave;
    },
    onSuccess: (data) => {
      success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myLeaves", userId] });
    },
    onError: (err: any) => {
      error(err.message || "Failed to update leave");
    },
  });

  // Delete leave
  const deleteLeaveMutation = useMutation({
    mutationFn: async (leaveId: number) => {
      const mutation = `
        mutation DeleteLeave($id: Int!, $userId: Int!) {
          deleteLeave(id: $id, userId: $userId) { message }
        }
      `;
      const variables = { id: leaveId, userId: parseInt(userId, 10) };
      const res = await api.post("", { query: mutation, variables });
      return res.data.data.deleteLeave;
    },
    onSuccess: (data) => {
      success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myLeaves", userId] });
    },
    onError: (err: any) => {
      error(err.message || "Failed to delete leave");
    },
  });

  return {
    myLeavesQuery,
    allLeavesQuery,
    requestLeaveMutation,
    updateLeaveMutation,
    deleteLeaveMutation,
  };
};
