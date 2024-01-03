import { z } from "zod";

export const createProjectDto = z.object({
  name: z.string().min(1, "Title is required.").max(255),
  description: z.string().max(65535).nullable().optional(), //
});

// create patch dto from extending create dto
export const updateProjectDto = z.object({
  name: z.string().min(1, "Title is required.").max(255).optional(),
  description: z.string().max(65535).nullable().optional(),
});
