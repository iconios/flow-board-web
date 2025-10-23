import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <NavBar />
      {children}
      <Footer />
    </SocketProvider>
  );
};

export default TaskLayout;
