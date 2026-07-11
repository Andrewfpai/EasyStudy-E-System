import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const statusOptions = ["Aktif", "Nonaktif", "Keluar"] as const;

interface StudentFiltersProps {
  tokenRemainingOp: string;
  onTokenRemainingOpChange: (op: string) => void;
  tokenRemainingVal: number | null;
  onTokenRemainingValChange: (val: number | null) => void;
  statusFilter: string[];
  onToggleStatusFilter: (status: string, checked: boolean) => void;
}

export default function StudentFilters({
  tokenRemainingOp,
  onTokenRemainingOpChange,
  tokenRemainingVal,
  onTokenRemainingValChange,
  statusFilter,
  onToggleStatusFilter,
}: StudentFiltersProps) {
  return (
    <div className="flex flex-row items-start gap-5 md:flex-col md:items-left lg:flex-row lg:items-center lg:gap-10 mt-6">
      <div className="flex flex-col gap-2">
        <label className="font-medium xl:text-lg">Sisa Token</label>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                {tokenRemainingOp}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onTokenRemainingOpChange(">")}>{">"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTokenRemainingOpChange("<")}>{"<"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTokenRemainingOpChange("=")}>{"="}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            type="number"
            value={tokenRemainingVal ?? ""}
            onChange={(e) => onTokenRemainingValChange(e.target.value ? parseInt(e.target.value) : null)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary max-w-24"
            placeholder="Value"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-medium -mt-2 xl:text-lg">Filter Status</label>
        <div className="flex gap-4">
          {statusOptions.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={statusFilter.includes(s)}
                onCheckedChange={(checked) => onToggleStatusFilter(s, !!checked)}
                className="w-5 h-5 border-[1.5px] border-gray-300 data-[state=checked]:text-E-white data-[state=checked]:bg-primary cursor-pointer"
              />
              <span className="text-sm xl:text-base">{s}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}