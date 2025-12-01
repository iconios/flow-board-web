/*
    #Plan: Move Task from one List to another
    1. Get the task id and its current list id
    2. Check the server returned task to check if the list id is different
    3. If different, move the task to the new list and sort according to position
    4. If not different, sort the tasks according to position
    */

import { useDndBoard } from "../lib/DnDBoardContext";
import { TaskType } from "../lib/task.types";

// Server -> Client: { id } => { _id }
function toClientTask<T extends { id: string }>(
  t: T,
): Omit<T, "id"> & { _id: string } {
  const { id, ...rest } = t;
  return { ...rest, _id: id };
}

export function useHandleTaskReorder() {
  const { lists, setLists } = useDndBoard();

  return (serverTask: TaskType) => {
    const movedId = serverTask.id;

    // 1) Find source list & task
    const sourceListIndex = lists.findIndex((l) =>
      l.tasks.some((t) => t._id === movedId),
    );
    if (sourceListIndex === -1) return;

    const sourceList = lists[sourceListIndex];
    const existing = sourceList.tasks.find((t) => t._id === movedId);
    if (!existing) return;

    // 2) Check if list changed
    const isDifferentList = existing.listId !== serverTask.listId;

    if (isDifferentList) {
      // 3a) Move to target list
      const targetListIndex = lists.findIndex(
        (l) => l.id === serverTask.listId,
      );
      if (targetListIndex === -1) return;

      const normalized = toClientTask(serverTask);

      const newLists = [...lists];

      // remove from source (immutable)
      newLists[sourceListIndex] = {
        ...sourceList,
        tasks: sourceList.tasks.filter((t) => t._id !== movedId),
      };

      // add to target & sort by position (immutable)
      const targetList = newLists[targetListIndex];
      newLists[targetListIndex] = {
        ...targetList,
        tasks: [...targetList.tasks, normalized].sort(
          (a, b) => a.position - b.position,
        ),
      };

      setLists(newLists);
      return;
    }

    // 4) Same list: just sort by position
    const newLists = [...lists];
    newLists[sourceListIndex] = {
      ...sourceList,
      tasks: [...sourceList.tasks].sort((a, b) => a.position - b.position),
    };
    setLists(newLists);
  };
}
