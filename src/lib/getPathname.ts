"use client";

import { usePathname } from "next/navigation";

const GetPathname = (): string | undefined => {
  const pathname = usePathname();
  return pathname.split("/").filter(Boolean).pop();
};

export default GetPathname;
