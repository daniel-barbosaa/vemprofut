import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export interface Summary {
  id: string;
  user_id: string;
  pelada: Pelada;
  created_at: string;
}

export async function getAll() {
  const { data, error } = await supabase
    .from("summaries")
    .select("*")
    .overrideTypes<Summary[]>();

  return { data, error };
}
