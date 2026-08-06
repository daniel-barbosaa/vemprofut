import { useAuth } from "@/app/hooks/use-auth";

import { create } from "@/app/services/feedback/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  SuggestionFormDefaultValues,
  suggestionFormSchema,
  type SuggestionFormSchema,
} from "./suggestion-form-schema";

export function useSuggestionsController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SuggestionFormSchema>({
    resolver: zodResolver(suggestionFormSchema),
    defaultValues: SuggestionFormDefaultValues,
  });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = hookFormSubmit(async (feedback) => {
    if (!user) {
      return;
    }

    setIsSubmitting(true);

    const { error } = await create(
      {
        userId: user.id,
        name: user.user_metadata.name,
        email: user.user_metadata.email,
      },
      feedback,
    );

    if (error) {
      toast.error("Houve algum erro ao enviar feedback, tente novamente!");
      setIsSubmitting(false);
      return;
    }

    setSent(true);
    setIsSubmitting(false);
  });

  return {
    hookFormSubmit,
    register,
    errors,
    setValue,
    watch,
    handleSubmit,
    sent,
    setSent,
    isSubmitting,
  };
}
