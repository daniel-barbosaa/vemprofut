import { supabase } from "@/app/lib/supabase";

export function useSignIn() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return { signInWithGoogle };
}
