import { z } from "zod";

export const CreateBoardMemberInputSchema = z.object({
  board_id: z.string(),
  userEmail: z.email(),
  role: z.string(),
});

export type CreateBoardMemberInputType = z.infer<
  typeof CreateBoardMemberInputSchema
>;

const CreateBoardMemberServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  member: z.object({
    memberId: z.string(),
    boardId: z.string(),
    userId: z.string(),
    role: z.string(),
  }),
});

export type CreateBoardMemberServerResponseType = z.infer<
  typeof CreateBoardMemberServerResponseSchema
>;

const GetBoardMembersServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  members: z.array(
    z.object({
      memberId: z.string(),
      boardId: z.string(),
      user: z.object({
        firstname: z.string(),
        email: z.string(),
        userId: z.string(),
      }),
      role: z.string(),
    }),
  ),
});

export type GetBoardMembersServerResponseType = z.infer<
  typeof GetBoardMembersServerResponseSchema
>;

const GetBoardMembersSchema = z.object({
  memberId: z.string(),
  boardId: z.string(),
  user: z.object({
    firstname: z.string(),
    email: z.string(),
    userId: z.string(),
  }),
  role: z.string(),
});
export type GetBoardMembersType = z.infer<typeof GetBoardMembersSchema>;

export const MemberSchema = z.object({
  member: z.object({
    memberId: z.string(),
    boardId: z.string(),
    user: z.object({
      firstname: z.string(),
      email: z.string(),
      userId: z.string(),
    }),
    role: z.string(),
  }),
});

export type MemberType = z.infer<typeof MemberSchema>;
