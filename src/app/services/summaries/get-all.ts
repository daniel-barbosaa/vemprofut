import { PAGINATION } from "@/app/constant/pagination";
import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export interface Summary {
  id: string;
  user_id: string;
  pelada: Pelada;
  created_at: string;
}

export async function getAll(page: number): Promise<Summary[]> {
  const from = (page - 1) * PAGINATION.PAGE_SIZE;
  const to = from + PAGINATION.PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("summaries")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false })
    .overrideTypes<Summary[]>();

  if (error) {
    throw error;
  }

  return data ?? [];
}
