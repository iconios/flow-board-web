import { z } from "zod";
import { DndListSchema } from "./list.types";

export const DndBoardContextSchema = z.object({
  lists: z.array(DndListSchema),
  activeId: z.string().or(z.null()),
  setLists: z.function({
    input: [z.array(DndListSchema)],
    output: z.void(),
  }),
  moveTask: z.function({
    input: [z.string(), z.string()],
    output: z.void(),
  }),
  reorderTask: z.function({
    input: [z.string(), z.string(), z.number()],
    output: z.void(),
  }),
  reorderList: z.function({
    input: [z.string(), z.string()],
    output: z.void(),
  }),
  setActiveId: z.function({
    input: [z.string().or(z.null())],
    output: z.void(),
  }),
});

export type DndBoardContextType = z.infer<typeof DndBoardContextSchema>;
