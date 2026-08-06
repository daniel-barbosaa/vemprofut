import { useFeedback } from "@/app/hooks/use-feedback";

export function useFeedbackController() {
  const { data, isLoading } = useFeedback();

  return { data, isLoading };
}
