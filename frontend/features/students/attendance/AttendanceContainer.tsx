"use client";
import { useState } from "react";
import { Student } from "@/types/student";
import { useAttendanceFilter } from "./hooks/useAttendanceFilter";
import { useAttendanceSelection } from "./hooks/useAttendanceSelection";
import { useTokenSubtraction } from "./hooks/useTokenSubtraction";
import { AttendanceSearchBar } from "./components/AttendanceSearchBar";
import { TokenSubtractControl } from "./components/TokenSubtractControl";
import { AttendanceTable } from "./components/AttendanceTable";

interface AttendanceContainerProps {
  studentsInput: Student[];
}

export default function AttendanceContainer({ studentsInput }: AttendanceContainerProps) {
  const [students, setStudents] = useState<Student[]>(studentsInput);

  const { search, setSearch, sortedStudents } = useAttendanceFilter(students);
  const { selectedStudents, toggleSelect, clearSelection } = useAttendanceSelection();
  const { tokenInput, setTokenInput, loading, subtractTokens } = useTokenSubtraction({
    students,
    setStudents,
    selectedStudents,
    clearSelection,
  });

  if (students.length === 0) {
    return <p className="text-gray-500">No students found.</p>;
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md py-6 mb-5">
      <div className="flex flex-col px-6">
        <div className="font-extrabold text-2xl">Catatan Kehadiran</div>
        <div className="grid grid-cols-5 gap-5 mt-5">
          <AttendanceSearchBar value={search} onChange={setSearch} />
          <TokenSubtractControl
            tokenInput={tokenInput}
            onTokenInputChange={setTokenInput}
            onSubtract={subtractTokens}
            disabled={loading || selectedStudents.length === 0 || !tokenInput}
            canSubtract={!!tokenInput && selectedStudents.length > 0}
          />
        </div>
      </div>
      <AttendanceTable
        students={sortedStudents}
        selectedStudents={selectedStudents}
        onToggleSelect={toggleSelect}
      />
    </div>
  );
}