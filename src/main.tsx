import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { store } from "./store/store";
import { Provider as AppProvider } from "react-redux";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </AppProvider>
  </StrictMode>
);
