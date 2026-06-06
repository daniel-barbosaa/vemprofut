import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/auth-context";
import { Router } from "./router";

export default function App() {
  return (
    <>
      <Theme>
        <AuthProvider>
          <Router />
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </Theme>
    </>
  );
}
