import "./App.css";
import { MantineProvider } from "@mantine/core";
import { MarketGarden } from "./routes/market-garden";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/home";
import { Mortain } from "./routes/mortain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/market-garden",
    element: <MarketGarden />,
  },
  {
    path: "/mortain",
    element: <Mortain />,
  },
]);

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
