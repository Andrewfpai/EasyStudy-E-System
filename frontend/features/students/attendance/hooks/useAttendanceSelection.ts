import { useState } from "react";
import { Student } from "@/types/student";

export function useAttendanceSelection() {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const toggleSelect = (student: Student) => {
    setSelectedStudents((prev) =>
      prev.find((s) => s.id === student.id)
        ? prev.filter((s) => s.id !== student.id)
        : [...prev, student]
    );
  };

  const clearSelection = () => setSelectedStudents([]);

  return { selectedStudents, toggleSelect, clearSelection };
}