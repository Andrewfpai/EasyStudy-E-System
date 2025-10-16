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

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
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



  useEffect(() => {
    getStudents().then(res => {
      if (Array.isArray(res.data)) setStudents(res.data);
    });
  }, []);

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
    <div className="bg-gray-200 rounded-lg px-2 py-4">
      <div className="flex flex-row items-center justify-between ">

        <div className="font-bold text-2xl ml-5">Student Table</div>
        

        <div>

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

            <div className={`${filterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300 ease-in-out flex flex-col bg-[#E7E7E7] rounded-[10px] p-8 space-y-6 absolute z-20 mt-4`}>
              {/* Token Used Filter */}
              <div className="flex items-center gap-2 mb-2">
                <label>Token Used:</label>
                <select value={tokenUsedOp} onChange={(e) => setTokenUsedOp(e.target.value)}>
                  <option value=">">{" > "}</option>
                  <option value="<">{" < "}</option>
                  <option value="=">{" = "}</option>
                </select>
                <input
                  type="number"
                  value={tokenUsedVal ?? ""}
                  onChange={(e) => setTokenUsedVal(e.target.value ? parseInt(e.target.value) : null)}
                  className="border px-2 py-1 rounded"
                />
              </div>

              {/* Token Remaining Filter */}
              <div className="flex items-center gap-2 mb-2">
                <label>Token Remaining:</label>
                <select value={tokenRemainingOp} onChange={(e) => setTokenRemainingOp(e.target.value)}>
                  <option value=">">{" > "}</option>
                  <option value="<">{" < "}</option>
                  <option value="=">{" = "}</option>
                </select>
                <input
                  type="number"
                  value={tokenRemainingVal ?? ""}
                  onChange={(e) => setTokenRemainingVal(e.target.value ? parseInt(e.target.value) : null)}
                  className="border px-2 py-1 rounded"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 mb-2">
                <label>Status:</label>
                {["ACTIVE", "TEMP_INACTIVE", "OUT"].map(s => (
                  <label key={s} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(s)}
                      onChange={(e) => {
                        if (e.target.checked) setStatusFilter([...statusFilter, s]);
                        else setStatusFilter(statusFilter.filter(st => st !== s));
                      }}
                    />
                    {s}
                  </label>
                ))}
              </div>

              {/* Joined Date Filter */}
              <div className="flex items-center gap-2 mb-2">
                <label>Joined Date:</label>
                <select value={joinedDateOp} onChange={(e) => setJoinedDateOp(e.target.value)}>
                  <option value=">">{" > "}</option>
                  <option value="<">{" < "}</option>
                </select>
                <input
                  type="date"
                  value={joinedDateVal}
                  onChange={(e) => setJoinedDateVal(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              </div>
            </div>

        </div>

      </div>

      


       <div className="mt-4 flex ">
 
        <div className="max-w-vw overflow-auto max-h-[500px] border rounded-md">
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
                {sortedStudents.map(student => (
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
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.joinedDate}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.updateAt || "-"}</TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
          </div>
        </div>
    </div>
  );
}
