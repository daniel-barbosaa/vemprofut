import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { Router } from "./router";

export default function App() {
  return (
    <>
      <Theme>
        <Router />
        <Toaster position="top-center" reverseOrder={false} />
      </Theme>
    </>
  );
}
