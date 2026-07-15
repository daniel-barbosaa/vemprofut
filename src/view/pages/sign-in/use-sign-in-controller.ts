import { supabase } from "@/app/lib/supabase";

export function useSignInController() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {},
    });
  }

  return { signInWithGoogle };
}
