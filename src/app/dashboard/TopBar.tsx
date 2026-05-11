"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetMeQuery } from "@/services/auth";
import { axiosInstance } from "@/services/axios";
import { redirect } from "next/navigation";
import { useState } from "react";

const TopBar = () => {
  const {
    data: meData,
    isFetching, refetch
  } = useGetMeQuery();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await axiosInstance.get("/auth/logout");
    setIsLoggingOut(false);
    redirect("/login");
  }

  return (
    <div
      className="py-2 px-5 bg-gray-200 sticky top-0 flex justify-between items-center"
    >
      <p className="text-lg">
        Email: <span className="font-medium">{meData?.email}</span>
      </p>
      <Button
        className="text-base h-auto px-4 py-2 cursor-pointer"
        onClick={handleLogout}
      >
        <span>
          Logout
        </span>
        {
          isLoggingOut && (
            <Spinner />
          )
        }
      </Button>
    </div>
  )
}

export default TopBar;
