"use client";
import { useEffect, useState } from "react";
import { getStudents } from "../../../lib/api";
import { useRouter } from "next/navigation";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { formatDateToISO, formatForDisplay } from "@/utils/date";

export default function StudentTable({studentsInput}) {
  const [students, setStudents] = useState<Student[]>(studentsInput);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const [tokenUsedOp, setTokenUsedOp] = useState(">");
  const [tokenUsedVal, setTokenUsedVal] = useState<number | null>(null);

  const [tokenRemainingOp, setTokenRemainingOp] = useState(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]); 
  // Example: ["ACTIVE", "TEMP_INACTIVE"]

  const [joinedDateOp, setJoinedDateOp] = useState(">");
  const [joinedDateVal, setJoinedDateVal] = useState<string>(""); // store as YYYY-MM-DD

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({key:"id", direction:"asc"});

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  



  function compare(val: number, op: string, target: number) {
    if (target == null) return true; // no filter applied
    switch (op) {
      case ">": return val > target;
      case "<": return val < target;
      case "=": return val === target;
      default: return true;
    }
  }

  function compareDate(val: string, op: string, target: string) {
    if (!target) return true;
    const v = new Date(val);
    const t = new Date(target);
    if (isNaN(v.getTime()) || isNaN(t.getTime())) return true;
    return op === ">" ? v > t : v < t;
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.hanziName?.toLowerCase().includes(search.toLowerCase()) ||
      student.pinyinName?.toLowerCase().includes(search.toLowerCase()) ||
      String(student.phoneNumber).includes(search);

    const matchesTokenUsed = compare(student.tokenUsed, tokenUsedOp, tokenUsedVal!);
    const matchesTokenRemaining = compare(student.tokenRemaining, tokenRemainingOp, tokenRemainingVal!);

    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(student.status);

    const matchesJoinedDate = compareDate(student.joinedDate, joinedDateOp, joinedDateVal);

    // FINAL SEARCH RESULTS
    return matchesSearch && matchesTokenUsed && matchesTokenRemaining && matchesStatus && matchesJoinedDate;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
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



  // useEffect(() => {
  //   getStudents().then(res => {
  //     if (Array.isArray(res.data)) setStudents(res.data);
  //   });
  // }, []);

  const resetFilters = () => {
    setTokenUsedOp(">");
    setTokenUsedVal(null);
    setTokenRemainingOp(">");
    setTokenRemainingVal(null);
    setStatusFilter([]);
    setJoinedDateOp(">");
    setJoinedDateVal("");
  };

  // const filteredStudents = students.filter(student =>
  //   student.name.toLowerCase().includes(search.toLowerCase()) ||
  //   student.hanziName?.toLowerCase().includes(search.toLowerCase()) ||
  //   student.pinyinName?.toLowerCase().includes(search.toLowerCase()) ||
  //   student.phoneNumber?.toString()?.includes(search)
  // );

  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  console.log("student:",students);
  return (
    <div className="flex flex-col bg-gray-200 rounded-lg py-4 ">

      <div className="flex flex-row items-center justify-between mb-5 px-6">
        <div className="font-bold text-2xl">Student Table</div>
        <div className="">
          <div className="flex flex-row gap-4">
            <button
                className="px-4 py-2 bg-gray-500 rounded-md"
                onClick={() => setFilterOpen(!filterOpen)}
              > Filters </button>

              <input
                type="text"
                placeholder="Search by Name, Hanzi, or Pinyin"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>

          <div className={`${filterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} 
            transition-opacity duration-300 ease-in-out flex flex-col bg-white rounded-xl p-6 space-y-5 
            absolute z-20 mt-4 shadow-lg -ml-36 min-w-72`}>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Token Used</label>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400">

                    {tokenUsedOp}
                    </div>
                  </DropdownMenuTrigger>
                   <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTokenUsedOp(">")}>{">"}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTokenUsedOp("<")}>{"<"}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTokenUsedOp("=")}>{"="}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <input
                  type="number"
                  value={tokenUsedVal ?? ""}
                  onChange={(e) => setTokenUsedVal(e.target.value ? parseInt(e.target.value) : null)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Value"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
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
                  className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Value"
                />
              </div>
            </div>

            

            <div className="flex flex-col gap-2">
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


          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Joined Date</label>
            <div className="grid gap-2 grid-cols-5">
              <div className="col-span-2 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-full flex border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {joinedDateOp === ">" ? "After" : "Before"}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setJoinedDateOp(">")}>After</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setJoinedDateOp("<")}>Before</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    className="col-span-3 flex items-center justify-between border border-gray-300 rounded-md px-3 py-1.5 text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {joinedDateVal ? joinedDateVal : "Pick a date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        setDate(selectedDate);
                        console.log(selectedDate)
                        const formatted = formatDateToISO(selectedDate)
                        setJoinedDateVal(formatted);
                        setOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <button 
            className="px-4 py-2 bg-[#f8c311] rounded-md  " 
            onClick={()=>{resetFilters()}}>Reset</button>
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
                  <TableHead className="px-8 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Email</TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Address</TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Phone</TableHead>
                  <TableHead
                    className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer" 
                    onClick={()=>{requestSort("tokenUsed")}}
                  >Tokens Used{sortConfig?.key === "tokenUsed" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead
                    className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer" 
                    onClick={()=>{requestSort("tokenRemaining")}}
                  >Tokens Remaining{sortConfig?.key === "tokenRemaining" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer">Status</TableHead>
                  <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                    onClick={()=>{requestSort("joinedDate")}}
                  >Joined Date{sortConfig?.key === "joinedDate" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {sortedStudents.map(student => {
                  const formattedDate = formatForDisplay(student?.joinedDate)
                  return (
                  <TableRow 
                    key={student.id}
                    onClick={() => router.push(`/students/${student.id}`)}
                  >
                    <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.id}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{student.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{student.hanziName}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{student.pinyinName}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{student.email}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600 min-w-[300px] whitespace-normal">{student.address}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{student.phoneNumber}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.tokenUsed}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.tokenRemaining}</TableCell>
                    <TableCell className={`px-6 py-4 text-sm font-semibold text-center  ${
                        student.status === "ACTIVE" ? "text-green-600" :
                        student.status === "OUT" ? "text-red-600" :
                        "text-yellow-600"
                      } min-w-32` }>{student.status}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{`${formattedDate?.date} (${formattedDate?.time})`}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{student.updateAt || "-"}</TableCell>
                  </TableRow>
                  )})}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  );
}
