import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Home } from "./components/home";

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Home />
    </MantineProvider>
  );
}
