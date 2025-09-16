import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavMenu from "./components/ag grid/NavMenu";
import importerLogo from "./assets/logo.png";

export default function App() {
  return (
    <div className="h-screen flex flex-col" >
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
      <nav className="flex text-neutral-600 py-2 items-center justify-between py-1 px-6 relative border-b">
        <NavLink to="/" className="flex items-center gap-2">
          <img className="h-[60px]" src={importerLogo} />
          <div className="uppercase flex  flex-col items-center">
            <span className="text-xl font-semibold text-neutral-700">Shopify Importer</span>
            <small className="text-[12px] -mt-2 text-neutral-500 tracking-wider italic ">Dropshipping made easy</small>
          </div>
        </NavLink>
        {/* search product by name, sku or oem */}
        <div className="flex items-center gap-4">
          <NavMenu />
        </div>
      </nav>
      <div className="h-full bg-neutral-50">
        <Outlet />
      </div>
    </div>
  );
}
