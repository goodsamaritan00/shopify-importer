// import useEurasProducts from "../../hooks/useEuras";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../ui/pagination";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../ui/select";

// interface ITablePaginationProps {

// }

// export default function TablePagniation() {

//   return (
//     <div className="bg-white py-1 flex items-center border justify-between gap-8 px-18">
//         <div className="text-sm flex items-center gap-2">
//           <span>Total Results:</span>
//           <span className="font-bold text-neutral-700">
//             {eurasProducts.total}
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-neutral-500">Show</span>
//           <Select
//             defaultValue={displayNr}
//             onValueChange={(value) => {
//               setDisplayNr(value);
//             }}
//             value={displayNr} // control the value from sta
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="10" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem className="font-bold text-neutral-700" value="10">
//                 10
//               </SelectItem>
//               <SelectItem className="font-bold text-neutral-700" value="20">
//                 20
//               </SelectItem>
//               <SelectItem className="font-bold text-neutral-700" value="30">
//                 30
//               </SelectItem>
//               <SelectItem className="font-bold text-neutral-700" value="40">
//                 40
//               </SelectItem>
//               <SelectItem className="font-bold text-neutral-700" value="50">
//                 50
//               </SelectItem>
//             </SelectContent>
//           </Select>
//           <span className="text-sm text-neutral-500">per page</span>
//         </div>
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => {
//                   setSiteNumber((prev) => {
//                     const prevNum = Number(prev);
//                     return prevNum > 1 ? String(prevNum - 1) : prev;
//                   });
//                 }}
//               />
//             </PaginationItem>

//             {[...Array(eurasProducts.siteNumbers)].map((_, index) => {
//               const site = index + 1;
//               return (
//                 <PaginationItem
//                   key={site}
//                   data-page={site}
//                   onClick={(e) => {
//                     const page = (e.currentTarget as HTMLElement).dataset.page;
//                     if (page) {
//                       setSiteNumber(page);
//                     }
//                   }}
//                 >
//                   <PaginationLink isActive={site.toString() === siteNumber}>
//                     {site}
//                   </PaginationLink>
//                 </PaginationItem>
//               );
//             })}

//             <PaginationItem>
//               <PaginationNext
//                 onClick={() => {
//                   setSiteNumber((prev) => {
//                     const prevNum = Number(prev);
//                     return prevNum < eurasProducts.siteNumbers
//                       ? String(prevNum + 1)
//                       : prev;
//                   });
//                 }}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//   )
// }
