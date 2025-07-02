import { TableCell, TableRow } from "../../ui/table";
import type { IEurasProduct } from "../../../interfaces/IEuras";

import Overview from "./Overview";
import Manufacturer from "./Manufacturer";
import Importer from "./Importer";
import ShopifyStatus from "./ShopifyStatus";
import type { IProductInfoProps } from "../interfaces";

export default function ProductInfo({ product }: IProductInfoProps) {
  return (
    <TableRow className="bg-blue-50">
      <TableCell className="px-4 py-8 w-full h-full gap-4" colSpan={10}>
        <div className="w-full flex justify-between">
          <img
            className="border-2 w-[200px] h-[200px] object-cover border-neutral-400 rounded-md"
            src={product.picurlbig}
          />
          {/* product overview */}
          <Overview product={product} />
          {/* manufacturer info */}
          <Manufacturer product={product} />
          {/* importer info */}
          <Importer product={product} />
          {/* status */}
          <ShopifyStatus product={product} />
        </div>
      </TableCell>
    </TableRow>
  );
}
