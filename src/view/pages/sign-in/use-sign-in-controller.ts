import { supabase } from "@/app/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignInFormDefaultValues,
  signInFormSchema,
  type SignInFormSchema,
} from "./sign-in-form-schema";

export function useSignInController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: SignInFormDefaultValues,
  });
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
  });

  return { signInWithGoogle, register, hookFormSubmit, errors, handleSubmit };
}
