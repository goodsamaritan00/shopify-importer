import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import AuthPage from "./AuthPage";
import AgTable from "./AgTable";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="auth" element={<AuthPage />} />
      <Route index element={
        <ProtectedRoute>
          <AgTable />
        </ProtectedRoute>
        } />
    </Route>,
  ),
);

export default router;
