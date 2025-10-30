"use client";
import { useEffect, useState } from "react";
import { getStudents } from "@/lib/api"
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Student {
  id: number;
  name: string;
  hanziName: string;
  pinyinName: string;
  email: string;
  address: string;
  phoneNumber: number;
  tokenUsed: number;
  tokenRemaining: number;
  joinedDate: string;
  status: "ACTIVE" | "OUT" | "TEMP_INACTIVE";
}

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

export default function StudentListHome({studentsInput}) {
  const [students, setStudents] = useState<Student[]>(studentsInput);

  const [tokenRemainingOp, setTokenRemainingOp] = useState(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]); 
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({key:"id", direction:"asc"});

  // const [search, setSearch] = useState(3);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (!sortConfig) return 0;

    let aVal: any = a[sortConfig.key as keyof Student];
    let bVal: any = b[sortConfig.key as keyof Student];

    // Special case: joinedDate → compare as Date
    if (sortConfig.key === "joinedDate") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    // Special case: id → numeric comparison
    if (sortConfig.key === "id") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    // Default: string comparison in alphabetical order
    if (typeof aVal === "string" && typeof bVal === "string") {
      const comparison = aVal.localeCompare(bVal);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    // Fallback for numbers/dates
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });



  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  console.log("student:",students);
  return (
    <div className="flex flex-col bg-gray-200 rounded-lg shadow-md py-4">
      {/* Search input */}
    <div className="flex flex-col mb-5 px-6">
      <div className="font-bold text-2xl">Student Reminder</div>

      <div className="flex flex-row gap-5 md:flex-col md:items-left lg:flex-row lg:items-center lg:gap-10 mt-5">
        <div className="flex flex-col gap-2 ">
          <label className="text-gray-700 font-medium">Token Remaining</label>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400">

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
              className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-24"
              placeholder="Value"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="text-gray-700 font-medium">Status</label>
          <div className="flex gap-4">
            {["ACTIVE", "TEMP_INACTIVE", "OUT"].map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <Checkbox
                  checked={statusFilter.includes(s)}
                  onCheckedChange={(checked) => {
                    if (checked) setStatusFilter([...statusFilter, s])
                    else setStatusFilter(statusFilter.filter((st) => st !== s))
                  }}
                  className="w-5 h-5 border-[1.5px] border-gray-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>


      <div className="overflow-auto border bg-gray-100 flex-1">
        <div className="max-w-vw overflow-auto max-h-[500px] rounded-md">
          <Table className="w-full bg-white">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead
                  className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer" 
                  onClick={()=>{requestSort("id")}}
                >ID {sortConfig?.key === "id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                  onClick={()=>{requestSort("name")}}
                >Name {sortConfig?.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                  onClick={()=>{requestSort("hanziName")}}
                >Hanzi {sortConfig?.key === "hanziName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                  onClick={()=>{requestSort("pinyinName")}}
                >Pinyin {sortConfig?.key === "pinyinName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Phone</TableHead>
                
                <TableHead
                  className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer" 
                  onClick={()=>{requestSort("tokenRemaining")}}
                >Tokens Remaining{sortConfig?.key === "tokenRemaining" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer">Status</TableHead>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer">Contact</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
                {sortedStudents.map(student => (
                <TableRow 
                  key={student.id}
                  // onClick={() => router.push(`/students/${student.id}`)}
                >
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.id}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.name}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.hanziName}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.pinyinName}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.phoneNumber}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.tokenRemaining}</TableCell>
                  <TableCell className={`px-6 py-4 text-sm font-semibold text-center  ${
                    student.status === "ACTIVE" ? "text-green-600" :
                    student.status === "OUT" ? "text-red-600" :
                    "text-yellow-600"
                  } min-w-32` }>{student.status}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">
                    <Link href={`https://wa.me/${student.phoneNumber}`}>
                      <button className="px-[20px] ...">Hubungi Murid</button>
                    </Link>
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
    </div>
  );
}
