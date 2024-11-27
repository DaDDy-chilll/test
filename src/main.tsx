import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { store } from "./store/store";
import { Provider as AppProvider } from "react-redux";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
export const queryClient = new QueryClient();
// import { initializeAxe } from "../axeConfig";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const renderApp = () => (

    <AppProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </AppProvider>

);
root.render(renderApp());
// if (import.meta.env.VITE_ENV !== "production") {
//   initializeAxe(); // Initialize Axe with the custom config
//   root.render(renderApp());
// } else {
//   root.render(renderApp());
// }
