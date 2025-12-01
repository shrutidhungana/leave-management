import React from "react";
import { useDashboard } from "../../../hooks/useDashboard";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";

type DashboardProps = {
  userId: string;
};

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const { data: stats, isLoading, isError } = useDashboard(userId);
  console.log({ stats });

  if (isLoading)
    return (
      <p className="text-center py-20 text-gray-400 text-xl animate-pulse">
        <CardSkeleton />
      </p>
    );

  if (isError || !stats)
    return (
      <p className="text-center py-20 text-red-500 text-xl font-semibold">
        Failed to load dashboard
      </p>
    );

  const remainingPercentage = Math.round((stats.remainingPaidLeaves / 5) * 100);

  // 🔥 Construct recentLeaves since backend does NOT provide it
  const recentLeaves = stats.lastLeave
    ? [
        {
          date: stats.lastLeave.startDate,
          reason: stats.lastLeave.reason,
          remarks: stats.lastLeave.remarks,
        },
      ]
    : [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-50 p-8">
      <div className="max-w-[1800px] mx-auto flex flex-col gap-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Leaves */}
          <Card className="bg-indigo-50 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-indigo-800">
                📝 Total Leaves
              </CardTitle>
              <CardDescription className="text-sm text-indigo-600">
                {stats.totalLeaves > 0
                  ? `${stats.totalLeaves} days taken`
                  : "None yet"}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="text-4xl font-bold text-indigo-900 text-center">
                {stats.totalLeaves > 0 ? stats.totalLeaves : 0}
              </div>
            </CardContent>
          </Card>

          {/* Remaining Paid Leaves */}
          <Card className="bg-green-50 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-800">
                ✅ Remaining Paid Leaves
              </CardTitle>
              <CardDescription className="text-sm text-green-600">
                {stats.remainingPaidLeaves} / 5
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="w-full bg-green-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${remainingPercentage}%` }}
                />
              </div>
              <div className="text-green-900 font-semibold text-center mt-2">
                {stats.remainingPaidLeaves} days left
              </div>
            </CardContent>
          </Card>

          {/* Last Leave */}
          <Card className="bg-pink-50 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-pink-800">
                📅 Last Leave
              </CardTitle>
              <CardDescription className="text-sm text-pink-600">
                {stats.lastLeave?.startDate
                  ? new Date(stats.lastLeave.startDate).toDateString()
                  : "N/A"}{" "}
                -{" "}
                {stats.lastLeave?.endDate
                  ? new Date(stats.lastLeave.endDate).toDateString()
                  : "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 text-center text-pink-900 font-medium">
              {stats.lastLeave?.reason || "No leaves taken yet"}
            </CardContent>
          </Card>

          {/* Leave Summary */}
          <Card className="bg-yellow-50 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-800">
                🧾 Leave Summary
              </CardTitle>
              <CardDescription className="text-sm text-yellow-600">
                Quick glance at your leaves
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 text-center text-yellow-900 font-medium">
              Total: {stats.totalLeaves} | Remaining:{" "}
              {stats.remainingPaidLeaves}
            </CardContent>
          </Card>
        </div>

        {/* Recent Leaves Table */}
        <Card className="bg-white shadow-lg rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Leaves
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Your last leave records
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4">
            {recentLeaves.length ? (
              <ul className="divide-y divide-gray-200">
                {recentLeaves.slice(0, 5).map((leave, idx) => (
                  <li
                    key={idx}
                    className="py-3 flex justify-between items-center"
                  >
                    <span className="text-gray-700 font-medium">
                      {new Date(leave.date).toDateString()}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {leave.reason}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {leave.remarks}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No leaves taken yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
