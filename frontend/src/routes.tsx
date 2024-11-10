import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import { MainPage } from "./pages/index";
import { Routes } from "@/constants/routes";
import ProcessPage from "./pages/process";
import ListPage from "./pages/list";
import { ProtectedRoute } from "./layout/ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      element: <BasicLayout />,
      children: [
        {
          path: Routes.Home,
          element: <MainPage />,
        },
        {
          path: Routes.Process,
          element: (
            <ProtectedRoute>
              <ProcessPage />
            </ProtectedRoute>
          ),
        },
        {
          path: Routes.List,
          element: <ListPage />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
