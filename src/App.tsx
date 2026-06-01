import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  return (
    <>
      <Theme>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </Theme>
    </>
  );
}
