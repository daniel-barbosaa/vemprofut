import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export interface Summary {
  id: string;
  user_id: string;
  pelada: Pelada;
  created_at: string;
}

type SummaryResponse = Summary[];

export async function getAll(): Promise<SummaryResponse> {
  const { data, error } = await supabase
    .from("summaries")
    .select("*")
    .order("created_at", { ascending: false })
    .overrideTypes<SummaryResponse>();

  if (error) {
    throw error;
  }

  return data ?? [];
}
