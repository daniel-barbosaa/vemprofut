import { z } from "zod";

export const createPeladaSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  matchDuration: z.number(),
  goalLimit: z.number(),
  maxConsecutiveWins: z.number(),
});

export type CreatePeladaFormSchema = z.infer<typeof createPeladaSchema>;

export const createPeladaFormDefaultValues: CreatePeladaFormSchema = {
  name: "",
  matchDuration: 7,
  goalLimit: 2,
  maxConsecutiveWins: 2,
};
