"use client";
import { useEffect, useState } from "react";
import { getStudents, subtractStudentTokens } from "@/lib/api"; // import API
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/utils/date";

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
  updatedAt: string;
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

export default function Absensi() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [tokenInput, setTokenInput] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({
    key: "updatedAt",
    direction: "desc", // most recent first
    });

  const sortedStudents = [...students].sort((a, b) => {
    const aTime = new Date(a.updatedAt || 0).getTime();
    const bTime = new Date(b.updatedAt || 0).getTime();
    return bTime - aTime; // newest first
  });



  useEffect(() => {
    getStudents().then(res => {
      if (Array.isArray(res.data)) setStudents(res.data);
    });
  }, []);

  

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
          const updated = await subtractStudentTokens(student.id, -tokenInput);

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
    <div className="flex flex-col bg-gray-200 rounded-lg shadow-md py-4">
      <div className="flex flex-col px-6">
        <div className="font-bold text-2xl">Student Attendance</div>
        
        <div className="grid grid-cols-5 gap-5 mt-5">
          <input
            type="text"
            placeholder="Search by Name, Hanzi, or Pinyin"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 col-span-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Token Controls */}
          <div className="grid grid-cols-4 col-span-2 flex items-center gap-2">
            <input
              type="number"
              value={tokenInput ?? ""}
              onChange={e => setTokenInput(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Token amount"
              className="px-4 py-2 col-span-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-red-500 col-span-2 text-white px-4 py-1 rounded disabled:opacity-50"
              onClick={() => subtractTokens()}
              disabled={loading}
            >
              Subtract Token
            </button>
          </div>

        </div>
      </div>

      <div className="overflow-auto border bg-gray-100 flex-1 mt-5">
        <div className="max-w-vw overflow-auto max-h-[500px] rounded-md">
          <Table className="w-full bg-white">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer">Select</TableHead>
                <TableHead
                  className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer" 
                  
                >ID
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                  
                >Name 
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                 
                >Hanzi 
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" 
                  
                >Pinyin 
                </TableHead>
                
                <TableHead
                  className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer" 
                  
                >Tokens Remaining
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer">Status</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
                {sortedStudents.map(student => {
                  const isSelected = selectedStudents.some(s => s.id === student.id);
                  return (
                <TableRow 
                  key={student.id}
                  // onClick={() => router.push(`/students/${student.id}`)}
                >
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(student)}
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.id}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.name}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.hanziName}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">{student.pinyinName}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{student.tokenRemaining}</TableCell>
                  <TableCell className={`px-6 py-4 text-sm font-semibold text-center  ${
                    student.status === "ACTIVE" ? "text-green-600" :
                    student.status === "OUT" ? "text-red-600" :
                    "text-yellow-600"
                  } min-w-32` }>{student.status}</TableCell>
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
