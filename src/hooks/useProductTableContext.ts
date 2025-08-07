import { useContext } from "react";
import {} from "../context/AuthContext";
import { ProductTableContext } from "../context/AgGridContext";

const useProductTableContext = () => {
  const context = useContext(ProductTableContext);

  if (!context) {
    throw new Error("Context Error");
  }

  return context;
};

export default useProductTableContext;
