import ShowTask from "@/components/task/showTask";

const TaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: string; listId: string }>;
}) => {
  const { taskId, listId } = await params;

  console.log("Show task id", taskId);
  return <ShowTask taskId={taskId} listId={listId} />;
};

export default TaskPage;
