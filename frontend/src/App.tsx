import { MantineProvider } from "@mantine/core";
import { Router } from "./pages/Router";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router />
    </MantineProvider>
  );
}

export default App;
