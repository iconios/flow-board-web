import NavBar from "@/components/NavBar";
import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <NavBar />
      {children}
    </SocketProvider>
  );
};

export default TaskLayout;
