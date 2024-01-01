import { z } from "zod";

export const createProjectDto = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

// create patch dto from extending create dto
export const updateProjectDto = createProjectDto.optional();
