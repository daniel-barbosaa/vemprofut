import { usePeladaStore } from "@/store/pelada/pelada.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createPeladaFormDefaultValues,
  createPeladaSchema,
  type CreatePeladaFormSchema,
} from "./create-pelada-form-schema";

export function useCreatePeladaController() {
  const { createPelada } = usePeladaStore();
  const navigate = useNavigate();
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
    navigate("/players");
  });

  return { handleSubmit, register, errors, watch };
}
