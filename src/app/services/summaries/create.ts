import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export async function create(userId: string, pelada: Pelada) {
  return await supabase.from("summaries").insert({
    user_id: userId,
    pelada,
  });
}
