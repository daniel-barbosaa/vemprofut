import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export type UpdatePeladaOptions = {
  status?: "active" | "finished";
};

export async function update(
  userId: string,
  pelada: Pelada,
  options?: UpdatePeladaOptions,
) {
  const { data, error } = await supabase
    .from("peladas")
    .update({
      data: pelada,
      ...options,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pelada.id)
    .eq("owner_id", userId)
    .eq("status", "active")
    .select()
    .single();

  if (error) {
    throw error;
  }

  return { data };
}
