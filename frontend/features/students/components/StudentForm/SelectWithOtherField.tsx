import { memo } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const MemoizedSelect = memo(Select);

export default function SelectWithOtherField({ label, value, onChange, customHeardFromRef,options }: any) {
  return (
    <div className="flex flex-col">
            <label className="mb-2 font-bold">{label}</label>
            <MemoizedSelect value={value} onValueChange={onChange}>
              <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
              </SelectContent>
            </MemoizedSelect>
            {value === "Lainnya" && <input ref={customHeardFromRef} placeholder="Silakan isi sumber informasi lainnya" className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />}
          </div>
  );
}
