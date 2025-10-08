import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
        {children}
    </SocketProvider>
  )
};

export default TaskLayout;
