/*
#Plan:
1. Get the board ID and Fetch the board's lists
2. Display the list
3. Each list should fetch its tasks
*/
"use server"
import ListsForBoard from "@/components/list/listsForBoard";

const Page = async ({ params }: { params: Promise<{ boardId: string }> }) => {
  // 0. Declare the variables and constants
  const { boardId } = await params;
  return <ListsForBoard boardId={boardId} />;
};

export default Page;
