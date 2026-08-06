import { supabase } from "@/app/lib/supabase";
import type { Feedback } from "@/app/types/feedback";

type FeedbackResponse = Feedback[];

export async function getAll(): Promise<FeedbackResponse> {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .overrideTypes<FeedbackResponse>();

  if (error) {
    throw error;
  }

  return data ?? [];
}
