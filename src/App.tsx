import { Checkbox } from "./components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"

import { FaSearch } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const TABLE_HEADERS: string[] = [
  'Select',
  'Model Number',
  'Part Number (SKU)',
  'Product Name',
  'Manufacturer',
  'Device Type',
  'Price',
  'Avaliability',
  'Import Status',
  'Last Updated'
]

const parts: any = [
  {
    select: false,
    modelNumber: "X123-GT",
    partNumber: "SKU-00123",
    productName: "Brake Lever Set",
    manufacturer: "Ninebot",
    deviceType: "Electric Scooter",
    price: "€29.99",
    availability: "In Stock",
    importStatus: "Imported",
    lastUpdated: "2025-05-25",
  },
  {
    select: false,
    modelNumber: "A456-XL",
    partNumber: "SKU-00456",
    productName: "Battery Pack 36V",
    manufacturer: "Segway",
    deviceType: "Electric Scooter",
    price: "€179.00",
    availability: "Low Stock",
    importStatus: "Pending",
    lastUpdated: "2025-05-20",
  },
  {
    select: false,
    modelNumber: "Z789-MAX",
    partNumber: "SKU-00789",
    productName: "Motor Controller",
    manufacturer: "Xiaomi",
    deviceType: "Electric Scooter",
    price: "€85.50",
    availability: "Out of Stock",
    importStatus: "Not Imported",
    lastUpdated: "2025-05-15",
  },
];


function App() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['parts'],
    queryFn: async () => {
      const BASE_URL = "https://shop.euras.com/eed.php";
      const EED_TOKEN = "UOoLEAQBfex57Q6O";

      const PARAMS = new URLSearchParams({
        EED: EED_TOKEN,
        Action: "artikelsuche",
        suchbg: "samsung washing machine",
        anzahl: "25",
        seite: "1",
        attrib: "1",
        bigPicture: "1"
      });

      const url = `${BASE_URL}?${PARAMS}`

      try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data
      } catch (err) {
        console.log(err)
      }
    }
  })

  console.log(data)

  return (
    <div className="max-w-[70vw] mx-auto mt-12">

      <div className="max-w-[350px] flex items-center h-9 gap-2 my-4 relative">
        <Input className="shadow-sm h-full" />
        <Button variant='ghost' className="h-full flex items-center absolute right-0 text-blue-400">
          <FaSearch />
        </Button>
      </div>
      
      <Table>
      <TableCaption>A list of searched parts.</TableCaption>
      <TableHeader className='bg-blue-400 '>
        <TableRow>
          {TABLE_HEADERS.map((header: string) => {
            return <TableHead className='text-white font-semibold'>{header}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {parts.map((part: any) => (
          <TableRow key={part.partNumber}>
            {/* select part for import */}
            <TableCell className="font-medium">
              <Checkbox />
            </TableCell>
            {/* part model number */}
            <TableCell>
              {part.modelNumber}
            </TableCell>
            {/* part SKU */}
            <TableCell>
              {part.partNumber}
            </TableCell>
            {/* part name */}
            <TableCell>
              {part.productName}
            </TableCell>
            {/* part manufacturer */}
            <TableCell>
              {part.manufacturer}
            </TableCell>
            {/* device type */}
            <TableCell>
              {part.deviceType}
            </TableCell>
            {/* part price */}
            <TableCell>
              {part.price}
            </TableCell>
            {/* avaliability */}
            <TableCell>
              {part.availability}
            </TableCell>
            {/* import status*/}
            <TableCell>
              {part.importStatus}
            </TableCell>
            {/* product last update */}
            <TableCell>
              {part.lastUpdated}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>
            <div className="flex justify-between items-center w-full">
              {/* Left side */}
              <div>
                Total Results: <span className="font-semibold ml-1">124</span>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2">
                <FaAngleLeft className="text-xl" />
                <Input className="max-w-[50px]" />
                <FaAngleRight className="text-xl" />
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}

export default App
