import React from "react";
import { useLeaves } from "@/hooks/useLeaves";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";

const AllLeaves = () => {
  const { allLeavesQuery } = useLeaves("");
  const leaves = allLeavesQuery.data || [];

  if (allLeavesQuery.isLoading) return <CardSkeleton />;
  if (allLeavesQuery.isError) return <p>Error loading leaves.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">All Employees Leaves</h2>

      {/* EMPTY STATE */}
      {leaves.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-xl font-semibold text-gray-600">
            No employees have requested leave yet.
          </p>
          <p className="text-gray-500">Leave requests will appear here.</p>
        </div>
      )}

      {/* LEAVE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {leaves.map((leave) => {
          const start = format(new Date(leave.startDate), "dd MMM yyyy");
          const end = format(new Date(leave.endDate), "dd MMM yyyy");

          return (
            <Card
              key={leave.id}
              className="transition-transform duration-200 hover:scale-[1.03] bg-blue-50/40 border border-blue-200 shadow-md rounded-xl"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-blue-800">
                  {leave.user.name}
                </CardTitle>

                <div className="text-sm text-blue-700 font-medium">
                  {start === end ? (
                    <span>{start}</span>
                  ) : (
                    <span>
                      {start} → {end}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">Reason:</span>{" "}
                  {leave.reason}
                </p>

                {leave.remarks && (
                  <p>
                    <span className="font-semibold text-gray-800">
                      Remarks:
                    </span>{" "}
                    {leave.remarks}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AllLeaves;
