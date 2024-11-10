import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import { Routes } from "@/constants/routes";
import ProcessPage from "./pages/process";
import ListPage from "./pages/list";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: Routes.Home,
        element: <MainPage />,
      },
      {
        path: Routes.Process,
        element: <ProcessPage />,
      },
      {
        path: Routes.List,
        element: <ListPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
