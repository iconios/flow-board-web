import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DndBoardContextType } from "./board.types";
import { DndListType } from "./list.types";
import { arrayMove } from "@dnd-kit/sortable";

const DndBoardContext = createContext<DndBoardContextType | undefined>(
  undefined,
);

export const DndBoardProvider = ({
  children,
  initialLists,
}: {
  children: ReactNode;
  initialLists: DndListType[];
}) => {
  const [lists, setLists] = useState<DndListType[]>(initialLists);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists]);

  // Move task to a different list
  const moveTask = (taskId: string, toListId: string) => {
    setLists((prev) => {
      return prev.map((list) => {
        // Remove task from its current list
        if (
          list.tasks.some(
            (task) => task._id === taskId && task.listId === list.id,
          )
        ) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task._id !== taskId),
          };
        }

        // Add task to target list and update its listId
        if (list.id === toListId) {
          const taskToMove = prev
            .flatMap((lis) => lis.tasks)
            .find((task) => task._id === taskId);

          if (taskToMove) {
            const updatedTask = {
              ...taskToMove,
              listId: toListId,
            };
            return {
              ...list,
              tasks: [...list.tasks, updatedTask],
            };
          }
        }
        return list;
      });
    });
  };

  // Reorder List
  const reorderList = useCallback((activeId: string, overId: string) => {
    setLists((prev) => {
      const activePosition = prev.findIndex((list) => list.id === activeId);
      const overPosition = prev.findIndex((list) => list.id === overId);

      console.log("List reorder indices:", { activePosition, overPosition });

      if (
        activePosition !== -1 &&
        overPosition !== -1 &&
        activePosition !== overPosition
      ) {
        // Use arrayMove from @dnd-kit/sortable
        const newLists = arrayMove(prev, activePosition, overPosition);
        console.log("Lists reordered");
        return newLists;
      }

      return prev;
    });
  }, []);

  // Reorder task within the same list
  const reorderTask = (listId: string, taskId: string, newPosition: number) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;

        const oldPosition = list.tasks.findIndex((task) => task._id === taskId);

        if (oldPosition === -1) return list;
        if (oldPosition === newPosition) return list;

        const max = list.tasks.length - 1;
        const to = Math.max(0, Math.min(newPosition, max));

        const tasks = [...list.tasks];
        const [moved] = tasks.splice(oldPosition, 1);
        tasks.splice(to, 0, moved);
        return { ...list, tasks };
      }),
    );
  };

  const contextValue = useMemo(
    () => ({
      lists,
      activeId,
      moveTask,
      reorderTask,
      setActiveId,
      reorderList,
    }),
    [lists, activeId],
  );

  return (
    <DndBoardContext.Provider value={contextValue}>
      {children}
    </DndBoardContext.Provider>
  );
};

export const useDndBoard = () => {
  const context = useContext(DndBoardContext);
  if (context === undefined) {
    throw new Error("useDndBoard must be used within a DndBoardProvider");
  }
  return context;
};
