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

export default function TablePagination({
  displayNumber,
  setDisplayNumber,
  setSiteNumber,
  siteNumber,
  total,
}: any) {
  return (
    <div className="bg-white py-1 flex items-center border justify-between gap-8 px-18">
      <div className="text-sm flex items-center gap-2">
        <span>Total Results:</span>
        <span className="font-bold text-neutral-700">{total}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500">Show</span>
        <Select
          defaultValue={displayNumber}
          onValueChange={(value: any) => setDisplayNumber(value)}
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setSiteNumber((prev: any) => {
                  const prevNum = Number(prev);
                  return prevNum > 1 ? String(prevNum - 1) : prev;
                })
              }
            />
          </PaginationItem>

          {[...Array(siteNumber)].map((_, index) => {
            const site = index + 1;
            return (
              <PaginationItem
                key={site}
                data-page={site}
                onClick={(e) => {
                  const page = (e.currentTarget as HTMLElement).dataset.page;
                  if (page) setSiteNumber(page);
                }}
              >
                <PaginationLink isActive={site.toString() === siteNumber}>
                  {site}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setSiteNumber((prev: any) => {
                  const prevNum = Number(prev);
                  return prevNum < total ? String(prevNum + 1) : prev;
                })
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
