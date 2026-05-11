"use client";

import { useGetMeQuery } from "@/services/auth";
import FeatureFlagsManagement from "./FeatureFlagsManagement/FeatureFlagsManagement";
import Organizations from "./Organizations/Organizations";
import UserDashboard from "./UserDashboard/UserDashboard";

const Dashboard = () => {
  const {
    data: meData,
    isFetching
  } = useGetMeQuery();

  const isSuperAdmin = meData?.roles.includes("superadmin");
  const isAdmin = meData?.roles.includes("admin");
  const isUser = meData?.roles.includes("user");

  let jsx = null;
  if(isFetching) {
    jsx = (
      <p className="text-center py-10 text-2xl">
        Loading...
      </p>
    )
  }
  if(isSuperAdmin) {
    jsx = <Organizations />
  }
  if(isAdmin) {
    jsx = <FeatureFlagsManagement />
  }
  if(isUser) {
    jsx = <UserDashboard />
  }

  return (
    <div
      className=""
    >
      {jsx}
    </div>
  )
}

export default Dashboard;