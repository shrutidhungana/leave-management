import Dashboard from "./dashboard";
import { useAuth } from "@/hooks/useAuth";

const DashboardWrapper = () => {
    const { userId } = useAuth();
  if (!userId) return <p className="text-center py-10">User not found</p>;

  return <Dashboard userId={userId} />;
};

export default DashboardWrapper;
