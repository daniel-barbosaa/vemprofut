import { Theme } from "@radix-ui/themes";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/auth-context";
import { Router } from "./router";
import { ErrorScreen } from "./view/components/unexpected-error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <>
      <Sentry.ErrorBoundary fallback={<ErrorScreen />}>
        <QueryClientProvider client={queryClient}>
          <Theme>
            <AuthProvider>
              <Router />
              <Toaster position="top-center" reverseOrder={false} />
            </AuthProvider>
          </Theme>
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </>
  );
}
