import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarSearch } from "lucide-react";
import { formatForDisplay } from "@/utils/date";
import { useStudentTableFilters } from "./useStudentTableFilters";

const STATUS_OPTIONS = ["Aktif", "Nonaktif", "Keluar"] as const;

type Filters = ReturnType<typeof useStudentTableFilters>;

export function StudentTableFilterPanel({ filters }: { filters: Filters }) {
  return (
    <div
      className={`${filters.filterOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        transition-opacity duration-300 ease-in-out flex flex-col bg-white rounded-2xl p-6 space-y-6
        absolute z-20 mt-4 shadow-lg -ml-36 min-w-72`}
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold">Token Sisa</label>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex-1 border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                {filters.tokenRemainingOp}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => filters.setTokenRemainingOp(">")}>{">"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => filters.setTokenRemainingOp("<")}>{"<"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => filters.setTokenRemainingOp("=")}>{"="}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            type="number"
            value={filters.tokenRemainingVal ?? ""}
            onChange={(e) => filters.setTokenRemainingVal(e.target.value ? parseInt(e.target.value) : null)}
            className="flex-1 border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
            placeholder="Masukkan token sisa"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Status</label>
        <div className="flex gap-4">
          {STATUS_OPTIONS.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <Checkbox
                checked={filters.statusFilter.includes(s)}
                onCheckedChange={(checked) => {
                  if (checked) filters.setStatusFilter([...filters.statusFilter, s]);
                  else filters.setStatusFilter(filters.statusFilter.filter((st) => st !== s));
                }}
                className="w-5 h-5 border border-gray-300 data-[state=checked]:text-E-white data-[state=checked]:bg-primary cursor-pointer"
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Tanggal Bergabung</label>
        <div className="grid gap-2 grid-cols-5">
          <div className="col-span-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="text-sm w-full flex border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                  {filters.joinedDateOp === ">" ? "Setelah" : "Sebelum"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => filters.setJoinedDateOp("<")}>Sebelum</DropdownMenuItem>
                <DropdownMenuItem onClick={() => filters.setJoinedDateOp(">")}>Sesudah</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Popover open={filters.open} onOpenChange={filters.setOpen}>
            <PopoverTrigger asChild>
              <button className={`${filters.joinedDateVal ? "" : "text-E-gray"} text-sm col-span-3 flex items-center justify-between border border-E-gray-b rounded-lg px-3 py-1.5 text-left focus:outline-none focus:ring-2 focus:ring-primary`}>
                {filters.joinedDateVal ? formatForDisplay(filters.joinedDateVal).date : "Pilih Tanggal"}
                <CalendarSearch className="w-5 h-5 text-black" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={filters.date} onSelect={filters.handleSelectJoinedDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <button
          className={`px-8 py-2 rounded-lg ${filters.filtersActive ? "bg-primary text-white cursor-pointer" : "bg-E-gray-b text-E-gray cursor-not-allowed"}`}
          onClick={() => filters.resetFilters()}
        >
          Reset
        </button>
      </div>
    </div>
  );
}