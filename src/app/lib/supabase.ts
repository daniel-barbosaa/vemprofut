import { createClient } from "@supabase/supabase-js";
import { ENV } from "../utils/env";

export const supabase = createClient(
  ENV.VITE_SUPABASE_URL,
  ENV.VITE_SUPABASE_PUBLISHABLE_KEY,
);
