import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { IEurasProduct } from "../interfaces/IEuras";

interface ProductTableContextValue {
  rowData: IEurasProduct[];
  setRowData: Dispatch<SetStateAction<IEurasProduct[]>>;
}

export const ProductTableContext = createContext<
  ProductTableContextValue | undefined
>(undefined);

export const ProductTableProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rowData, setRowData] = useState<IEurasProduct[]>([]);

  return (
    <ProductTableContext.Provider value={{ rowData, setRowData }}>
      {children}
    </ProductTableContext.Provider>
  );
};
