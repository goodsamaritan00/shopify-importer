import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";

ModuleRegistry.registerModules([AllCommunityModule]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </QueryClientProvider>,
);
