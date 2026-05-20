import { Welcome } from "@/view/pages/welcome";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
]);
