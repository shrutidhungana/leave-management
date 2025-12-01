import React from "react";
import { useDashboard } from "../../../hooks/useDashboard";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type DashboardProps = {
  userId: string;
};

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const { data: stats, isLoading, isError } = useDashboard(userId);

  console.log({stats})

  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-400 text-lg">Loading...</p>
    );

  if (isError || !stats)
    return (
      <p className="text-center py-10 text-red-500 text-lg">
        Failed to load dashboard
      </p>
    );

  // Prepare data for chart
  const chartData = stats.totalLeaves
    ? [
        { name: "Total", leaves: stats.totalLeaves },
        { name: "Remaining", leaves: stats.remainingPaidLeaves },
      ]
    : [{ name: "No Data", leaves: 0 }];

  return (
    <div className= "flex flex-col gap-6 p-6" >
    <h1 className="font-bold text-3xl">Dashboard</h1>
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-indigo-100 to-indigo-200 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              📝 Total Leaves
            </CardTitle>
            <CardDescription>
              {stats.totalLeaves > 0 ? stats.totalLeaves : "None yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-indigo-900 font-bold text-2xl text-center mt-2">
              {stats.totalLeaves > 0
                ? stats.totalLeaves + " days"
                : "No leaves taken"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              ✅ Remaining Paid Leaves
            </CardTitle>
            <CardDescription>{stats.remainingPaidLeaves} / 5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-green-200 rounded-full h-4 mt-2 overflow-hidden">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(stats.remainingPaidLeaves / 5) * 100}%` }}
              />
            </div>
            <div className="text-green-900 font-semibold text-center mt-2">
              {stats.remainingPaidLeaves} days left
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-800">
              📅 Last Leave
            </CardTitle>
            <CardDescription>
              {stats.lastLeave?.date
                ? new Date(stats.lastLeave.date).toDateString()
                : "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-pink-900 font-semibold text-center mt-2">
              {stats.lastLeave?.reason || "No leaves taken yet"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              ⏳ Upcoming Leave
            </CardTitle>
            <CardDescription>
              {stats.upcomingLeave?.date
                ? new Date(stats.upcomingLeave.date).toDateString()
                : "None"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-yellow-900 font-semibold text-center mt-2">
              {stats.upcomingLeave?.reason || "—"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="bg-white shadow-lg rounded-xl p-4">
        <CardHeader>
          <CardTitle className="text-gray-800 text-lg font-semibold">
            Leave Overview
          </CardTitle>
          <CardDescription>
            Visual representation of your leave stats
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leaves"
                stroke="#4f46e5"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
