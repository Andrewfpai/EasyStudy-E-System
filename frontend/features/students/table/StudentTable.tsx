"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/types/student";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStudentTableFilters } from "./useStudentTableFilters";
import { StudentTableToolbar } from "./StudentTableToolbar";
import { StudentTableRow } from "./StudentTableRow";

interface StudentTableProps {
  studentsInput: Student[];
}

export default function StudentTable({ studentsInput }: StudentTableProps) {
  const [students] = useState<Student[]>(studentsInput);
  const router = useRouter();
  const filters = useStudentTableFilters(students);

  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  return (
    <div className="flex flex-col bg-white py-4 shadow-md rounded-2xl mb-5">
      <StudentTableToolbar filters={filters} />

      <div className="overflow-auto flex-1 px-6">
        <div className="max-w-vw overflow-x-auto overflow-y-auto rounded-md">
          <Table className="w-full">
            <TableHeader className="text-E-gray">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer" onClick={() => filters.requestSort("id")}>
                  ID {filters.sortConfig?.key === "id" ? (filters.sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => filters.requestSort("name")}>
                  Nama {filters.sortConfig?.key === "name" ? (filters.sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => filters.requestSort("hanziName")}>
                  Hanzi {filters.sortConfig?.key === "hanziName" ? (filters.sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Phone</TableHead>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer" onClick={() => filters.requestSort("tokenRemaining")}>
                  Sisa Token {filters.sortConfig?.key === "tokenRemaining" ? (filters.sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer">Tipe Harga</TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Harga Les</TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer" onClick={() => filters.requestSort("startLevel")}>
                  Start Level {filters.sortConfig?.key === "startLevel" ? (filters.sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-background">
              {filters.sortedStudents.map((student) => (
                <StudentTableRow key={student.id} student={student} onViewDetail={(id) => router.push(`/students/${id}`)} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
