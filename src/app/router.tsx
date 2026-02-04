import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { BoardPage } from "../pages/BoardPage";
import { SettingsPage } from "../pages/SettingsPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <BoardPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
