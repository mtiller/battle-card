import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Home } from "./routes/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/market-garden",
    element: <Home />,
  },
]);

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
