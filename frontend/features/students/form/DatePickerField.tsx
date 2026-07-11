import { memo } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarArrowDown } from "lucide-react";

const MemoizedCalendar = memo(Calendar);

export default function DatePickerField({ label,value,onSelect,open,onOpenChange,placeholder }: any) {
  return (
    <div className="flex flex-col">
              <label className="mb-2 font-bold">{label}</label>
              <Popover open={open} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer">
                    <input
                      readOnly
                      value={value ? value.toLocaleDateString() : placeholder}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    <CalendarArrowDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0">
                  <MemoizedCalendar
                    mode="single"
                    selected={value}
                    captionLayout="dropdown"
                    onSelect={date => {
                      onSelect(date || undefined);
                      onOpenChange(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
  );
}
