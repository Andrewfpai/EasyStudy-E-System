import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";

const MemoizedSelect = memo(Select);

export default function SelectField({ label, value, onChange,options}: any) {
  return (
    <div className="flex flex-col">
        <label className="mb-2 font-bold">{label}</label>
        <MemoizedSelect
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
            {options.map((option: string) => (
                <SelectItem key={option} value={option} className="text-base !py-3">
                {option}
                </SelectItem>
            ))}
            </SelectContent>
        </MemoizedSelect>
    </div>
        );
}

