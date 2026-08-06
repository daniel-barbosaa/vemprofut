import { supabase } from "@/app/lib/supabase";
import type { Feedback } from "@/app/types/feedback";

type CreateFeedback = Pick<Feedback, "category" | "message">;

interface User {
  userId: string;
  name: string;
  email: string;
}

export async function create(
  { userId, name, email }: User,
  feedback: CreateFeedback,
) {
  return await supabase.from("feedback").insert({
    user_id: userId,
    name: name,
    email: email,
    ...feedback,
  });
}
