import MyLeavesTable from "./my-leaves";
import { useAuth } from "@/hooks/useAuth";

const MyLeavesWrapper = () => {
    const { userId } = useAuth();
    
  if (!userId) return <p className="text-center py-10">User not found</p>;

  return <MyLeavesTable userId={userId} />;
};

export default MyLeavesWrapper;