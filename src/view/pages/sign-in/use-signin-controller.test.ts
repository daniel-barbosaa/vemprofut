import { supabase } from "@/app/lib/supabase";
import { describe, expect, it, vi } from "vitest";
import { useSignInController } from "./use-sign-in-controller";

describe("useSignInController", () => {
  it("shold sign in with Google", async () => {
    const signInWithOAuth = vi
      .spyOn(supabase.auth, "signInWithOAuth")
      .mockResolvedValue({
        data: {
          provider: "google",
          url: "https://example.com",
        },
        error: null,
      });

    const { signInWithGoogle } = useSignInController();

    await signInWithGoogle();

    expect(signInWithOAuth).toHaveBeenCalledOnce();
    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
    });
  });

  it("should propagate the sign in error", async () => {
    const error = new Error("OAuth Failed");

    vi.spyOn(supabase.auth, "signInWithOAuth").mockRejectedValue(error);

    const { signInWithGoogle } = useSignInController();

    await expect(signInWithGoogle).rejects.toThrow("OAuth Failed");
  });
});
