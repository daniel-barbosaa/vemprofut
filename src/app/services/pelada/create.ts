import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export async function create(userId: string, pelada: Pelada) {
  const { data, error } = await supabase
    .from("peladas")
    .insert({
      id: pelada.id,
      owner_id: userId,
      status: "active",
      data: pelada,
    })
    .select("data")
    .single();

  if (error) {
    throw error;
  }

  return data.data as Pelada;
}
