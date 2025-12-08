"use client";
import { useEffect, useState } from "react";
import { getStudents } from "@/lib/api"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Student } from "@/app/types/student";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface StudentListHomeProps {
  studentsInput: Student[];
}

export default function StudentListHome({ studentsInput }: StudentListHomeProps) {
  const [students, setStudents] = useState<Student[]>(studentsInput);

  const [tokenRemainingOp, setTokenRemainingOp] = useState(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]); 
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({key:"id", direction:"asc"});

  const statusOptions = ["Aktif", "Nonaktif", "Keluar"]

  type StatusType = "Aktif" | "Nonaktif" | "Keluar";
  // const [search, setSearch] = useState(3);

  const StatusAvatar = ({ status }: { status: StatusType }) => {
  const color =
    status === "Aktif" ? "border-primary"
    : status === "Nonaktif" ? "border-secondary"
    : "border-tertiary";

  return (
    <div className={`w-20 h-20 rounded-full border-2 ${color} flex items-center justify-center`}>
      <div className="w-16 h-16 bg-white rounded-full"></div>
    </div>
  );
};
console.log(students)

  const filteredStudents = students.filter(student => {
  // status filter
    if (statusFilter.length > 0 && !statusFilter.includes(student.status)) return false;

    // token remaining filter
    if (tokenRemainingVal !== null) {
      if (tokenRemainingOp === ">" && !(student.tokenRemaining > tokenRemainingVal)) return false;
      if (tokenRemainingOp === "<" && !(student.tokenRemaining < tokenRemainingVal)) return false;
      if (tokenRemainingOp === "=" && !(student.tokenRemaining === tokenRemainingVal)) return false;
    }

    return true; // keep this student
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig) return 0;

    const key = sortConfig.key as keyof Student;

    const aVal = a[key];
    const bVal = b[key];

    // Handle dates
    if (key === "joinedDate") {
      const aDate = new Date(aVal as string);
      const bDate = new Date(bVal as string);
      return sortConfig.direction === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    }

    // Handle numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    // Handle strings
    if (typeof aVal === "string" && typeof bVal === "string") {
      const comparison = aVal.localeCompare(bVal);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    return 0; // fallback
  });




  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  // console.log("student:",students);
  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-3xl  py-6 text-E-Black ">
      {/* Search input */}
    <div className="flex flex-col mb-5 px-6">
      <div className="font-extrabold text-2xl">Pemantauan Murid</div>

      <div className="flex flex-row items-start gap-5 md:flex-col md:items-left lg:flex-row lg:items-center lg:gap-10 mt-6">
        <div className="flex flex-col gap-2 ">
          <label className="font-medium xl:text-lg">Sisa Token</label>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">

                {tokenRemainingOp}
                </div>
              </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTokenRemainingOp(">")}>{">"}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTokenRemainingOp("<")}>{"<"}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTokenRemainingOp("=")}>{"="}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              type="number"
              value={tokenRemainingVal ?? ""}
              onChange={(e) => setTokenRemainingVal(e.target.value ? parseInt(e.target.value) : null)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary max-w-24"
              placeholder="Value"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <label className="font-medium -mt-2 xl:text-lg">Filter Status</label>
          <div className="flex gap-4">
            {statusOptions.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={statusFilter.includes(s)}
                  onCheckedChange={(checked) => {
                    if (checked) setStatusFilter([...statusFilter, s])
                    else setStatusFilter(statusFilter.filter((st) => st !== s))
                  }}
                  className="w-5 h-5 border-[1.5px] border-gray-300 data-[state=checked]:text-E-white data-[state=checked]:bg-primary cursor-pointer"
                />
                <span className="text-sm xl:text-base">{s}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>



      <div className="grid grid-cols-3 gap-x-8 gap-y-6 xl:grid-cols-4 px-6">
        {sortedStudents.map(student => (
          <div
            key={student.id}
            className="flex flex-col items-center bg-background text-center rounded-2xl min-w-[175px] min-h-[300px] lg:min-h-[275px] p-6"
          >
            {/* Avatar */}
            <StatusAvatar status={student.status} />



            {/* Name & Token */}
            <div className="mt-4 font-bold text-sm xl:text-base">{student.name}</div>
            <div className="mt-2 text-sm xl:text-base">Sisa Token: {student.tokenRemaining}</div>

            {/* Spacer pushes button to bottom */}
            <div className="flex-1"></div>

            {/* Button */}
            

            <Link target="_blank" href={`https://wa.me/${student.phoneNumber}`} className="py-3 min-w-full bg-E-gray-b rounded-lg text-xs xl:text-base font-semibold cursor-pointer border hover:border-E-gray-b hover:bg-transparent"> 
              <button >
                Hubungi Murid
              </button>
            </Link>
          </div>
        ))}
      </div>

      
   
      
    </div>
  );
}
