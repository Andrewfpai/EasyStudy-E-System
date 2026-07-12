import { Search } from "lucide-react";

interface AttendanceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AttendanceSearchBar({ value, onChange }: AttendanceSearchBarProps) {
  return (
    <div className="relative w-full col-span-2 bg-background rounded-lg">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
      <input
        type="text"
        placeholder="Cari nama..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border-2 border-E-gray-b rounded-lg focus:border-2 focus:border-primary placeholder:text-sm"
      />
    </div>
  );
}