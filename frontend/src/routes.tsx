import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import { Routes } from "@/constants/routes";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: Routes.Home,
        element: <MainPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
