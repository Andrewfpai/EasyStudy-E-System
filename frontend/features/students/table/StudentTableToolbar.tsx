import { Search, ListFilter } from "lucide-react";
import { useStudentTableFilters } from "./useStudentTableFilters";
import { StudentTableFilterPanel } from "./StudentTableFilterPanel";

type Filters = ReturnType<typeof useStudentTableFilters>;

export function StudentTableToolbar({ filters }: { filters: Filters }) {
  return (
    <div className="flex flex-row items-center justify-between mb-5 px-6">
      <div className="font-extrabold text-2xl">Data Murid</div>
      <div className="">
        <div className="flex flex-row gap-4">
          <div>
            <button
              className={`flex flex-row items-center gap-2 px-4 py-2 border-2 border-E-gray-b text-E-black rounded-lg cursor-pointer ${filters.filterOpen ? "border-primary" : ""}`}
              onClick={() => filters.setFilterOpen(!filters.filterOpen)}
            >
              <ListFilter className="w-5 h-5" />Filter
            </button>
          </div>
          <div className="relative w-full bg-background rounded-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nama..."
              value={filters.search}
              onChange={(e) => filters.setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-E-gray-b rounded-lg focus:border-2 focus:border-primary placeholder:text-sm"
            />
          </div>
        </div>

        <StudentTableFilterPanel filters={filters} />
      </div>
    </div>
  );
}