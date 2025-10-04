"use client";

import { io, type Socket } from "socket.io-client";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { useUserContext } from "./user.context";

type SocketCtxType = Socket | null;
const SocketCtx = createContext<SocketCtxType>(null);
export const useSocket = () => useContext(SocketCtx);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { token } = useUserContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    const raw = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    console.log("[socket] NEXT_PUBLIC_SERVER_BASE_URL:", JSON.stringify(raw));

    if (!token || !raw) {
      // if token goes null, close any existing socket
      if (socket) {
        closingRef.current = true;
        socket.close();
        setSocket(null);
        closingRef.current = false;
      }
      return;
    }

    const SERVER_BASE_URL = raw.replace(/\/+$/, "");
    console.log("[socket] SERVER_BASE_URL:", SERVER_BASE_URL);

    // Close old socket (if any) before creating a new one
    if (socket) {
      closingRef.current = true;
      socket.close();
      setSocket(null);
      closingRef.current = false;
    }

    const s = io(SERVER_BASE_URL, {
      path: "/socket.io",
      // Uncomment if polling causes issues in your environment:
      // transports: ["websocket"],
      auth: { token: `Bearer ${token}` },
    });

    // Wire up basic events
    s.on("connect", () => console.log("[socket] connected:", s.id));
    s.on("disconnect", (reason) => console.log("[socket] disconnected:", reason));
    s.on("connect_error", (err: any) =>
      console.error("[socket] connect_error:", err.message)
    );

    setSocket(s);

    // Cleanup on unmount or token change
    return () => {
      if (!closingRef.current) {
        s.close();
      }
    };
  }, [token]); // env is read at runtime; no need to add to deps

  return <SocketCtx.Provider value={socket}>{children}</SocketCtx.Provider>;
}
