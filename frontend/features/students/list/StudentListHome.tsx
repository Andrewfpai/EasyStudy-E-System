"use client";
import { useMemo, useState, useCallback } from "react";
import { Student } from "@/types/student";
import StudentCard from "@/features/students/list/StudentCard";
import StudentFilters from "@/features/students/list/StudentFilters";
import { useStudentFilters, STATUS_OPTIONS } from "@/features/students/list/useStudentFilters";

interface StudentListHomeProps {
  studentsInput: Student[];
}

export default function StudentListHome({ studentsInput }: StudentListHomeProps) {
  const [students] = useState<Student[]>(studentsInput);

  const {
    tokenRemainingOp,
    setTokenRemainingOp,
    tokenRemainingVal,
    setTokenRemainingVal,
    statusFilter,
    toggleStatusFilter,
    sortedStudents,
  } = useStudentFilters(students);


  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-3xl py-6 mb-5">
      {/* Filter section */}
      <div className="flex flex-col mb-5 px-6">
        <div className="font-extrabold text-2xl">Pemantauan Murid</div>
        <StudentFilters 
          tokenRemainingOp={tokenRemainingOp}
          setTokenRemainingOp={setTokenRemainingOp}
          tokenRemainingVal={tokenRemainingVal}
          setTokenRemainingVal={setTokenRemainingVal}
          statusFilter={statusFilter}
          toggleStatusFilter={toggleStatusFilter}
          statusOptions={STATUS_OPTIONS}
        />
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 xl:grid-cols-4 px-6">
        {students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      </div>
  );
}
