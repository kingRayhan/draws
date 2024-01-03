import { z } from "zod";

export const createBoardDto = z.object({
  name: z.string().min(1, "Title is required.").max(255),
  description: z.string().max(65535).optional().nullable(),
  projectId: z.string(),
  appStates: z.string().optional(),
  elements: z.string().optional(),
});

// create patch dto from extending create dto
export const updateProjectDto = z.object({
  name: z.string().min(1, "Title is required.").max(255).optional(),
  description: z.string().max(65535).nullable().optional(),
  appStates: z.string().optional().nullable(),
  elements: z.string().optional().nullable(),
});
