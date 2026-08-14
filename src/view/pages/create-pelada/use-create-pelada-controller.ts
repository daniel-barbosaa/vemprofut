import { useAuth } from "@/app/hooks/use-auth";
import { peladaServices } from "@/app/services/pelada";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import type { Pelada } from "@/store/pelada/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createPeladaFormDefaultValues,
  createPeladaSchema,
  type CreatePeladaFormSchema,
} from "./create-pelada-form-schema";

export function useCreatePeladaController() {
  const { createPelada } = usePeladaStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreatePeladaFormSchema>({
    resolver: zodResolver(createPeladaSchema),
    defaultValues: createPeladaFormDefaultValues,
  });

  const { mutateAsync: savePelada } = useMutation({
    mutationFn: (pelada: Pelada) => {
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return peladaServices.create(user.id, pelada);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const pelada = createPelada(data);

    await savePelada(pelada);

    navigate("/players");
  });

  return { handleSubmit, register, errors, watch, setValue };
}
