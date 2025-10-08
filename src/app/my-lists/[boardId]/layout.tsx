import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const ListLayout = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default ListLayout;
