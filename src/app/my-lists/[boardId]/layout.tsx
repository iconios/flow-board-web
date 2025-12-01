import InAppFooter from "@/components/InAppFooter";
import InAppHeader from "@/components/InAppHeader";
import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const ListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <InAppHeader title={"Lists"} backView={true} backRoute="/my-boards" />
      {children}
      <InAppFooter xs={"100%"} sm={"100%"} md={"100%"} />
    </SocketProvider>
  );
};

export default ListLayout;
