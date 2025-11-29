"use client";
import InAppFooter from "@/components/InAppFooter";
import InAppHeader from "@/components/InAppHeader";
import { SocketProvider } from "@/lib/socketProvider";
import React from "react";
import secureLocalStorage from "react-secure-storage";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = secureLocalStorage.getItem("previousUrl");
  console.log("Last Segment", pathname);
  return (
    <SocketProvider>
      <InAppHeader title={"Task"} backView={true} backRoute={`${pathname}`} />
      {children}
      <InAppFooter xs={"100%"} sm={"100%"} md={"100%"} />
    </SocketProvider>
  );
};

export default TaskLayout;
