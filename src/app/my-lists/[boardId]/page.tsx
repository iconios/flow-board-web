/* eslint-disable @typescript-eslint/await-thenable */
/*
#Plan:
0. Declare the variables and constants
1. Get the board ID and Fetch the board's lists
2. Display the list
3. Each list should fetch its tasks
*/
"use server";
import ListsForBoard from "@/components/list/listsForBoard";
import { ListPageSearchParamsType } from "@/lib/types";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ boardId: string }>;
  searchParams: ListPageSearchParamsType;
}) => {
  const { boardId } = await params;

  const { t, bg, uid } = await searchParams;

  console.log("My-lists Page boardUserId", uid);
  return (
    <ListsForBoard boardId={boardId} title={t} bgColor={bg} userId={uid} />
  );
};

export default Page;
