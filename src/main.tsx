import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeContextProvider from "./ThemeContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
