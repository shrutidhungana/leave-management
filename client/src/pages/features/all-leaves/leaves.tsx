import React from "react";
import { useLeaves } from "@/hooks/useLeaves";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AllLeaves = () => {
  const { allLeavesQuery } = useLeaves(""); // no userId needed for allLeaves
  const leaves = allLeavesQuery.data || [];

  if (allLeavesQuery.isLoading) return <p>Loading leaves...</p>;
  if (allLeavesQuery.isError) return <p>Error loading leaves.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">All Employees Leaves</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {leaves.map((leave) => (
          <Card
            key={leave.id}
            className="hover:scale-105 transition-transform duration-200 shadow-lg border border-gray-100"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                {leave.user.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {format(new Date(leave.date), "dd MMM yyyy")}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-semibold">Reason:</span> {leave.reason}
              </p>
              {leave.remarks && (
                <p>
                  <span className="font-semibold">Remarks:</span>{" "}
                  {leave.remarks}
                </p>
              )}
              {/* Optional badge for leave type */}
              {/* <Badge variant="outline">Sick Leave</Badge> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllLeaves;
