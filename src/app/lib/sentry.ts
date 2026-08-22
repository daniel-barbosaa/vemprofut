import * as Sentry from "@sentry/react";
import { ENV } from "../utils/env";

Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: ENV.SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
