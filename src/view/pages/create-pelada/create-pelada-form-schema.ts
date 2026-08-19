import { z } from "zod";

export const createPeladaSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  playersPerTeam: z.number().min(4).max(7),
  matchDuration: z.number(),
  goalLimit: z.number(),
  maxConsecutiveWins: z.number(),
  overtimeEnabled: z.boolean(),
  overtimeDuration: z.number(),
});

export type CreatePeladaFormSchema = z.infer<typeof createPeladaSchema>;

export const createPeladaFormDefaultValues: CreatePeladaFormSchema = {
  name: "",
  playersPerTeam: 5,
  matchDuration: 7,
  goalLimit: 2,
  maxConsecutiveWins: 2,
  overtimeEnabled: false,
  overtimeDuration: 2,
};
