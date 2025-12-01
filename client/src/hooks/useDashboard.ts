// useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";
import { Leave, DashboardStats } from "../types/dashboard";

// Max paid leaves
const MAX_PAID_LEAVES = 5;

export const useDashboard = (userId: string) => {
  return useQuery<DashboardStats, Error>({
    queryKey: ["dashboard", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const query = `
        query MyLeaves($userId: Int!) {
          myLeaves(userId: $userId) {
            id
            startDate
            endDate
            reason
            remarks
            user {
              id
              name
            }
          }
        }
      `;

      const variables = { userId: parseInt(userId, 10) };

      const res = await api.post("", { query, variables });
      const data: Leave[] = res.data.data.myLeaves;

      const totalLeaves = data.length;
      const remainingPaidLeaves = Math.max(MAX_PAID_LEAVES - totalLeaves, 0);

      const sortedLeaves = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const lastLeave = sortedLeaves[0] ?? undefined;
      const upcomingLeave =
        sortedLeaves.find((leave) => new Date(leave.date) > new Date()) ?? undefined;
      
   
   console.log({ totalLeaves, remainingPaidLeaves, lastLeave, upcomingLeave });

      return {
        totalLeaves,
        remainingPaidLeaves,
        lastLeave,
        upcomingLeave,
      };
    },
    enabled: !!userId, 
  });
};
