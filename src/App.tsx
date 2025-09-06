import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavMenu from "./components/ag grid/NavMenu";
import useAuthContext from "./hooks/useAuthContext";

export default function App() {
  const { user } = useAuthContext();

  return (
    <div className="h-screen flex flex-col">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      <nav className="flex items-center justify-between text-white bg-blue-400 p-4 px-14 relative border-b">
        <h2 className="text-3xl font-[200] ">
          <span className="font-[600]">Shopify</span>
          Importer
        </h2>
        {/* search product by name, sku or oem */}
        <div className="flex items-center gap-4">
          <span className="text-neutral-00 text-sm">
            Welcome, <b>{user?.email}</b>
          </span>
          <NavMenu />
        </div>
      </nav>
      <div className="h-full w-screen">
        <Outlet />
      </div>
    </div>
  );
}
