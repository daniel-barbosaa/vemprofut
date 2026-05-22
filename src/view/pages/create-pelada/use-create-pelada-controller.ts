import { usePeladaStore } from "@/store/pelada/pelada.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createPeladaFormDefaultValues,
  createPeladaSchema,
  type CreatePeladaFormSchema,
} from "./create-pelada-form-schema";

export function useCreatePeladaController() {
  const { createPelada } = usePeladaStore();
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<CreatePeladaFormSchema>({
    resolver: zodResolver(createPeladaSchema),
    defaultValues: createPeladaFormDefaultValues,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    createPelada(data);
  });

  return { handleSubmit, register, errors, watch };
}
