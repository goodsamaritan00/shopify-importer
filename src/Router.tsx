import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import AuthPage from "./AuthPage";
import ProductTable from "./ProductTable";
import ProtectedRoute from "./ProtectedRoute";
import ProductsByAppliancesTable from "./ProductsByAppliancesTable";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="auth" element={<AuthPage />} />
      <Route
        index
        element={
          <ProtectedRoute>
            <ProductTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="products-by-appliances"
        element={
          <ProtectedRoute>
            <ProductsByAppliancesTable />
          </ProtectedRoute>
        }
      />
    </Route>,
  ),
);

export default router;
