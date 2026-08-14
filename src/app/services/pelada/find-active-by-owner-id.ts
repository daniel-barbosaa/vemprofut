import { supabase } from "@/app/lib/supabase";
import type { Pelada } from "@/store/pelada/types";

export async function findActiveByOwnerId(
  userId: string,
): Promise<Pelada | null> {
  const { data, error } = await supabase
    .from("peladas")
    .select("*")
    .eq("owner_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.data ?? null;
}
