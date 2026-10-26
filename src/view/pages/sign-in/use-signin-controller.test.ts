import { supabase } from "@/app/lib/supabase";
import { describe, expect, it, vi } from "vitest";
import { useSignInController } from "./use-sign-in-controller";

describe("useSignInController", () => {
  const signInWithOAuthMock = vi
    .spyOn(supabase.auth, "signInWithOAuth")
    .mockResolvedValue({
      data: {
        provider: "google",
        url: "https://example.com",
      },
      error: null,
    });

  it("shold sign in with Google", async () => {
    const { signInWithGoogle } = useSignInController();

    await signInWithGoogle();

    expect(signInWithOAuthMock).toHaveBeenCalledOnce();
    expect(signInWithOAuthMock).toHaveBeenCalledWith({
      provider: "google",
    });
  });

  it("should propagate the sign in error", async () => {
    const error = new Error("OAuth Failed");

    signInWithOAuthMock.mockRejectedValue(error);

    const { signInWithGoogle } = useSignInController();

    await expect(signInWithGoogle).rejects.toThrow("OAuth Failed");
  });
});
