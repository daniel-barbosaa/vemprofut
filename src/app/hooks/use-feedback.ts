import { useQuery } from "@tanstack/react-query";
import { feedbackService } from "../services/feedback";

export function useFeedback() {
  const { data, isFetching } = useQuery({
    queryKey: ["feedback"],
    queryFn: feedbackService.getAll,
    staleTime: Infinity,
  });

  return { data, isLoading: isFetching };
}
