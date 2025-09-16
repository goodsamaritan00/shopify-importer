import { type CellClassParams } from "ag-grid-community";

import { useState } from "react";
import { Input } from "../ui/input";
import { IoMdRefreshCircle } from "react-icons/io";

export default function SearchForm(p: CellClassParams) {
  const [searchInput, setSearchInput] = useState<string>("");

  // const { user } = useAuthContext();

  // const { setRowData } = useProductTableContext();

  const { setDeviceQuery } = p.context;

  // const { eurasProductsByAppliances, isSuccessEurasProductsByAppliances } =
  //   useEurasProductsByAppliances(deviceQuery, deviceId, "1", user!.token);

  // useEffect(() => {
  //   if (eurasProductsByAppliances && isSuccessEurasProductsByAppliances) {
  //     setRowData(eurasProductsByAppliances);
  //   }
  // }, [isSuccessEurasProductsByAppliances]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDeviceQuery(searchInput);
      }}
      className="relative w-full flex"
    >
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Gerät oder Modellname..."
        className="w-full pr-10 border-neutral-200 text-neutral-500 rounded-full focus:border-neutral-400"
      />
      <button type="submit" className="absolute left-[-10%]">
        <IoMdRefreshCircle className="text-neutral-300 text-3xl" />
      </button>
    </form>
  );
}
