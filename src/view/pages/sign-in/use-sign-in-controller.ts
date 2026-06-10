import { supabase } from "@/app/lib/supabase";

export function useSignInController() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://172.23.1.198:3000",
      },
    });
  }

  return { signInWithGoogle };
}
