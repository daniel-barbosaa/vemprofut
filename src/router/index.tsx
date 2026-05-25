import { CreatePelada } from "@/view/pages/create-pelada";
import { Home } from "@/view/pages/home";
import { Players } from "@/view/pages/players";
import { Welcome } from "@/view/pages/welcome";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/create",
    Component: CreatePelada,
  },
  {
    path: "/players",
    Component: Players,
  },
]);
