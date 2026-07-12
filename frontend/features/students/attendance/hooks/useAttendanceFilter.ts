import { useMemo, useState } from "react";
import { Student } from "@/types/student";
import { useDebounce } from "@/hooks/UseDebounce";

export function useAttendanceFilter(students: Student[]) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filteredStudents = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(q) ||
        student.hanziName?.toLowerCase().includes(q) ||
        student.pinyinName?.toLowerCase().includes(q)
    );
  }, [students, debouncedSearch]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      const aTime = new Date(a.updatedAt || 0).getTime();
      const bTime = new Date(b.updatedAt || 0).getTime();
      return bTime - aTime;
    });
  }, [filteredStudents]);

  return { search, setSearch, sortedStudents };
}