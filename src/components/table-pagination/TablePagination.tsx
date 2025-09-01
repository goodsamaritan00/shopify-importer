import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import getPages from "./utils/get-pages";

type TablePaginationProps = {
  displayNumber: string;
  setDisplayNumber: (val: string) => void;
  setCurrentSite: (val: string) => void;
  currentSite: string;
  siteTotal?: number;
  total?: number;
};

export default function TablePagination({
  displayNumber,
  setDisplayNumber,
  setCurrentSite,
  currentSite,
  siteTotal,
  total,
}: TablePaginationProps) {
  const currentPage = Number(currentSite);

  if (!siteTotal) return

  const pages = getPages(currentPage, siteTotal);

  return (
    <div className="bg-white flex items-center border justify-between gap-8 px-14">
      {/* Total results */}
      <div className="text-sm flex items-center gap-2">
        <span>Total Results:</span>
        <span className="font-bold text-neutral-700">{total}</span>
      </div>

      {/* Per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500">Show</span>
        <Select
          defaultValue={displayNumber}
          onValueChange={(value: string) => setDisplayNumber(value)}
          value={displayNumber}
        >
          <SelectTrigger>
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((value) => (
              <SelectItem
                key={value}
                className="font-bold text-neutral-700"
                value={String(value)}
              >
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-neutral-500">per page</span>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                const prevNum = Number(currentSite);
                setCurrentSite(prevNum > 1 ? String(prevNum - 1) : currentSite);
              }}
            />
          </PaginationItem>

          {/* Pages */}
          {pages.map((p, index) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2">…</span>
              </PaginationItem>
            ) : (
              <PaginationItem
                key={p}
                data-page={p}
                onClick={(e) => {
                  const page = (e.currentTarget as HTMLElement).dataset.page;
                  if (page) setCurrentSite(page);
                }}
              >
                <PaginationLink isActive={p.toString() === currentSite}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                const prevNum = Number(currentSite);
                setCurrentSite(prevNum < siteTotal ? String(prevNum + 1) : currentSite);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
