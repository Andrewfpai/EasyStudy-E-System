"use client";
import { useEffect, useState } from "react";
import { getStudents, subtractStudentTokens } from "@/lib/api"; // import API
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { Student } from "@/app/types/student";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AbsensiProps {
  studentsInput: Student[];
}

export default function Absensi({studentsInput}:AbsensiProps) {
  const [students, setStudents] = useState<Student[]>(studentsInput);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [tokenInput, setTokenInput] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);



  const sortedStudents = [...students].sort((a, b) => {
    const aTime = new Date(a.updatedAt || 0).getTime();
    const bTime = new Date(b.updatedAt || 0).getTime();
    return bTime - aTime; // newest first
  });



  

  const toggleSelect = (student: Student) => {
    if (selectedStudents.find(s => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  async function subtractTokens() {
    if (!tokenInput || loading) return;
    setLoading(true);

    try {
      const updatedStudents = await Promise.all(
        selectedStudents.map(async (student) => {

          // call backend
          const updated = await subtractStudentTokens(student.id, tokenInput);

          // return merged updated student
          return { ...student, tokenUsed: updated.tokenUsed, tokenRemaining: updated.tokenRemaining };
        })
      );

      // replace updated students in main list
      setStudents((prev) =>
        prev.map((student) =>
          updatedStudents.find((u) => u.id === student.id) || student
        )
      );

      setSelectedStudents([]);
      setTokenInput(null);
    } catch (err) {
      console.error("Error updating tokens:", err);
    } finally {
      setLoading(false);
    }
  }

  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md py-4 text-E-black">
      <div className="flex flex-col px-6">
        <div className="font-extrabold text-2xl">Catatan Kehadiran</div>
        
        <div className="grid grid-cols-5 gap-5 mt-5">
          <div className="relative w-full col-span-2 bg-background rounded-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

              <input
                type="text"
                placeholder="Cari nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-E-gray-b rounded-lg focus:border-2 focus:border-primary placeholder:text-sm"
              />
            </div>

          {/* Token Controls */}
          <div className="grid grid-cols-4 col-span-2 flex items-center gap-2">
            <input
              type="number"
              value={tokenInput ?? ""}
              onChange={e => setTokenInput(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Token amount"
              className="px-4 py-2.5 col-span-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-sm"
            />
            <div className="col-span-2">
              <button
                className={`px-4 py-2.5 rounded-lg
              ${tokenInput 
                ? "bg-primary text-white cursor-pointer" 
                : "bg-E-gray-b text-E-gray cursor-not-allowed"
              }`}
                onClick={() => subtractTokens()}
                disabled={loading}
              >
                Subtract Token
              </button>

            </div>
          </div>

        </div>
      </div>

      <div className="overflow-auto flex-1 mt-5 px-6 ">
        <div className="max-w-vw overflow-auto max-h-[500px] rounded-md">
          <Table className="w-full">
            <TableHeader className="text-E-gray">
              <TableRow>
                <TableHead className="py-3 text-center text-sm font-semibold  cursor-pointer">Select</TableHead>
                <TableHead
                  className="px-6 py-3 text-center text-sm font-semibold  cursor-pointer" 
                  
                >ID
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold  cursor-pointer" 
                  
                >Name 
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold  cursor-pointer" 
                 
                >Hanzi 
                </TableHead>
          
                
                <TableHead
                  className="px-6 py-3 text-center text-sm font-semibold  cursor-pointer" 
                  
                >Tokens Remaining
                </TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody className="border border-background">
                {sortedStudents.map((student, index) => {
                  const isSelected = selectedStudents.some(s => s.id === student.id);
                  return (
                <TableRow 
                  key={index}
                  // onClick={() => router.push(`/students/${student.id}`)}
                    className={`border border-background ${
                index % 2 === 0 ?"bg-background" : ""}`}
                >
                  <TableCell className="py-4 !pl-0 text-sm  text-center ">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(student)}
                      className=" w-5 h-5 border-2 border-gray-300 data-[state=checked]:text-E-white data-[state=checked]:bg-primary cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm  text-center">{student.id}</TableCell>
                  <TableCell className="px-6 py-4 text-sm ">{student.name}</TableCell>
                  <TableCell className="px-6 py-4 text-sm ">{student.hanziName}</TableCell>
                  <TableCell className="px-6 py-4 text-sm  text-center">{student.tokenRemaining}</TableCell>
                 
                </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>

      
    </div>
  );
}
