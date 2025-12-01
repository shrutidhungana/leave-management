import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ErrorBoundary from "@/components/common/error-boundary";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer position="top-right" />
  </QueryClientProvider>
  </ErrorBoundary>
  </React.StrictMode>
);


