"use client";
import { useEffect, useState } from "react";
import { getStudents } from "../../../lib/api";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { formatDateToISO, formatForDisplay } from "@/utils/date";
import { CalendarDays, CalendarSearch, ListFilter, Search} from 'lucide-react';


interface StudentTableProps {
  studentsInput: Student[];
}

export default function StudentTable({ studentsInput }: StudentTableProps) {
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

  const filtersActive =
    tokenUsedVal !== null ||
    tokenRemainingVal !== null ||
    statusFilter.length > 0 ||
    joinedDateVal !== "";


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

    // Make sure the key is a valid property of Student
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

    // Handle strings (default)
    if (typeof aVal === "string" && typeof bVal === "string") {
      const comparison = aVal.localeCompare(bVal);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    return 0; // fallback
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
    <div className="flex flex-col bg-white rounded-lg py-4 text-E-black ">

      <div className="flex flex-row items-center justify-between  mb-5 px-6 ">
        <div className="font-extrabold text-2xl">Data Murid</div>
        <div className="">
          <div className="flex flex-row gap-4">
            <div className=" ">
            <button
                className={`flex flex-row items-center gap-2 px-4 py-2 border-2 border-E-gray-b text-E-black rounded-lg cursor-pointer ${filterOpen?"border-primary":""}`}
                onClick={() => setFilterOpen(!filterOpen)}
              > <ListFilter className="w-5 h-5"/>Filter 
            </button>
            </div>
            <div className="relative w-full bg-background rounded-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

              <input
                type="text"
                placeholder="Cari nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-E-gray-b rounded-lg focus:border-2 focus:border-primary placeholder:text-sm"
              />
            </div>

          </div>

          <div className={`${filterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} 
            transition-opacity duration-300 ease-in-out flex flex-col bg-white rounded-2xl p-6 space-y-6 
            absolute z-20 mt-4 shadow-lg -ml-36 min-w-72`}>

            <div className="flex flex-col gap-2">
              <label className="font-bold">Token Terpakai</label>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex-1 border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
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
                  className="flex-1 border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                  placeholder="Masukkan token terpakai"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold">Token Sisa</label>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex-1 border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">

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
                  className="flex-1 border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                  placeholder="Masukkan token sisa"
                />
              </div>
            </div>

            

            <div className="flex flex-col gap-2">
              <label className="font-bold">Status</label>
              <div className="flex gap-4">
                {["Aktif", "Nonaktif", "Keluar"].map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                  >
                    <Checkbox
                      checked={statusFilter.includes(s)}
                      onCheckedChange={(checked) => {
                        if (checked) setStatusFilter([...statusFilter, s])
                        else setStatusFilter(statusFilter.filter((st) => st !== s))
                      }}
                      className="w-5 h-5 border border-gray-300 data-[state=checked]:text-E-white data-[state=checked]:bg-primary cursor-pointer"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

 
          <div className="flex flex-col gap-2">
            <label className="font-bold">Tanggal Bergabung</label>
            <div className="grid gap-2 grid-cols-5">
              <div className="col-span-2 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="text-sm w-full flex border border-E-gray-b rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                      {joinedDateOp === ">" ? "Setelah" : "Sebelum"}
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
                    className={`${joinedDateVal?"":"text-E-gray"} text-sm col-span-3 flex items-center justify-between border border-E-gray-b rounded-lg px-3 py-1.5 text-left focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    {joinedDateVal ? joinedDateVal : "Pilih Tanggal"}
                    <CalendarSearch className="w-5 h-5 text-black"/>
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

          <div className="">
            <button 
            className={`px-8 py-2 rounded-lg
              ${filtersActive 
                ? "bg-primary text-white cursor-pointer" 
                : "bg-E-gray-b text-E-gray cursor-not-allowed"
              }`}
            onClick={()=>{resetFilters()}}>Reset</button>
          </div>
          </div>

        </div>
      </div>

      



        
        <div className="overflow-auto flex-1 px-6 ">
          <div className="max-w-vw overflow-x-auto overflow-y-auto max-h-[500px] rounded-md">
            <Table className="w-full">
              <TableHeader className="text-E-gray ">
                <TableRow className="">
                  <TableHead
                    className="px-6 py-3 text-center text-sm font-semibold  cursor-pointer" 
                    onClick={()=>{requestSort("id")}}
                  >ID {sortConfig?.key === "id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold  cursor-pointer" 
                    onClick={()=>{requestSort("name")}}
                  >Nama {sortConfig?.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" 
                    onClick={()=>{requestSort("hanziName")}}
                  >Hanzi {sortConfig?.key === "hanziName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  {/* <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" 
                    onClick={()=>{requestSort("pinyinName")}}
                  >Pinyin {sortConfig?.key === "pinyinName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead> */}
                  {/* <TableHead className="px-8 py-3 text-left text-sm font-semibold cursor-pointer">Jenis Kelamin</TableHead> */}
                  {/* <TableHead className="px-8 py-3 text-left text-sm font-semibold cursor-pointer">Email</TableHead> */}
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Address</TableHead> */}
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Phone</TableHead>
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Birthdate</TableHead> */}
                  {/* <TableHead
                    className="px-6 py-3 text-center text-sm font-semibold cursor-pointer" 
                    onClick={()=>{requestSort("tokenUsed")}}
                  >Tokens Used{sortConfig?.key === "tokenUsed" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead> */}
                  <TableHead
                    className="px-6 py-3 text-center text-sm font-semibold cursor-pointer" 
                    onClick={()=>{requestSort("tokenRemaining")}}
                  >Sisa Token{sortConfig?.key === "tokenRemaining" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer">Tipe Harga</TableHead>
                  {/* <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" 
                    onClick={()=>{requestSort("joinedDate")}}
                    >Joined Date{sortConfig?.key === "joinedDate" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </TableHead> */}
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Harga Les</TableHead>
                  <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" 
                    onClick={()=>{requestSort("startLevel")}}
                  >Start Level{sortConfig?.key === "startLevel" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Nama Orangtua</TableHead> */}
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">HP Orangtua</TableHead> */}
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Education</TableHead> */}
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Nama Sekolah</TableHead> */}
                  {/* <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Last Updated</TableHead> */}
                  <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border border-background">
                  {sortedStudents.map(student => {
                  const formattedDate = formatForDisplay(student?.joinedDate)
                  return (
                  <TableRow 
                    key={student.id}
                    
                    className="border border-background"
                  >
                    <TableCell className="px-6 py-4 text-center">{student.id}</TableCell>
                    <TableCell className="px-6 py-4">{student.name}</TableCell>
                    <TableCell className="px-6 py-4">{student.hanziName}</TableCell>
                    {/* <TableCell className="px-6 py-4">{student.pinyinName}</TableCell> */}
                    {/* <TableCell className="px-6 py-4 text-center">{student.gender}</TableCell> */}
                    {/* <TableCell className="px-6 py-4">{student.email}</TableCell> */}
                    {/* <TableCell className="px-6 py-4 min-w-[300px] whitespace-normal">{student.address}</TableCell> */}
                    <TableCell className="px-6 py-4">{student.phoneNumber}</TableCell>
                    {/* <TableCell className="px-6 py-4">{student.birthDate ? formatForDisplay(student.birthDate)?.date : "-"}</TableCell> */}
                    {/* <TableCell className="px-6 py-4 text-center">{student.tokenUsed}</TableCell> */}
                    <TableCell className="px-6 py-4 text-center">{student.tokenRemaining}</TableCell>
                    <TableCell className={`px-6 py-4 font-semibold text-center min-w-32` }>{student.tipeHarga}</TableCell>
                    {/* <TableCell className="px-6 py-4">{`${formattedDate?.date} (${formattedDate?.time})`}</TableCell> */}
                    <TableCell className="px-6 py-4 text-center">{student.lessonPrice}</TableCell>
                    <TableCell className="px-6 py-4 text-center">{student.startLevel}</TableCell>
                    <TableCell 
                      onClick={() => router.push(`/students/${student.id}`)}
                      className="px-6 py-4 text-center font-semibold underline hover:no-underline cursor-pointer"
                      >Lihat Detail
                      </TableCell>
                    {/* <TableCell className="px-6 py-4 text-center">{student.parentName}</TableCell> */}
                    {/* <TableCell className="px-6 py-4 text-center">{student.parentPhone}</TableCell> */}
                    {/* <TableCell className="px-6 py-4 text-center">{student.education}</TableCell> */}
                    {/* <TableCell className="px-6 py-4 text-center">{student.schoolOrCompany}</TableCell> */}
                    {/* <TableCell className="px-6 py-4">{student.updatedAt ? `${formatForDisplay(student?.updatedAt).date} (${formatForDisplay(student?.updatedAt).time})` : "-"}</TableCell> */}
                  </TableRow>
                  )})}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  );
}
