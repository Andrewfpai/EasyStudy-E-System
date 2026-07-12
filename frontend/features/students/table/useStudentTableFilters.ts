import { useCallback, useMemo, useState } from "react";
import { Student } from "@/types/student";
import { useDebounce } from "@/hooks/UseDebounce"
import { formatDateToISO } from "@/utils/date";

type CompareOp = ">" | "<" | "=";
type SortConfig = { key: string; direction: "asc" | "desc" } | null;

export function useStudentTableFilters(students: Student[]) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [filterOpen, setFilterOpen] = useState(false);

  const [tokenRemainingOp, setTokenRemainingOp] = useState<CompareOp>(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [joinedDateOp, setJoinedDateOp] = useState<CompareOp>(">");
  const [joinedDateVal, setJoinedDateVal] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "id", direction: "asc" });

  const filtersActive =
    tokenRemainingVal !== null || statusFilter.length > 0 || joinedDateVal !== "";

  const requestSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev.direction === "asc") return { key, direction: "desc" };
      return { key, direction: "asc" };
    });
  }, []);

  const compare = useCallback((val: number, op: CompareOp, target: number) => {
    if (target == null) return true;
    switch (op) {
      case ">": return val > target;
      case "<": return val < target;
      case "=": return val === target;
      default: return true;
    }
  }, []);

  const compareDate = useCallback((val: string, op: CompareOp, target: string) => {
    if (!target) return true;
    const v = new Date(val);
    const t = new Date(target);
    if (isNaN(v.getTime()) || isNaN(t.getTime())) return true;
    return op === ">" ? v > t : v < t;
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        student.hanziName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        student.pinyinName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        String(student.phoneNumber).includes(debouncedSearch);

      const matchesTokenRemaining = compare(student.tokenRemaining, tokenRemainingOp, tokenRemainingVal!);
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(student.status);
      const matchesJoinedDate = compareDate(student.joinedDate, joinedDateOp, joinedDateVal);

      return matchesSearch && matchesTokenRemaining && matchesStatus && matchesJoinedDate;
    });
  }, [students, debouncedSearch, tokenRemainingOp, tokenRemainingVal, statusFilter, joinedDateOp, joinedDateVal, compare, compareDate]);

  const sortedStudents = useMemo(() => {
    if (!sortConfig) return filteredStudents;

    return [...filteredStudents].sort((a, b) => {
      const key = sortConfig.key as keyof Student;
      const aVal = a[key];
      const bVal = b[key];

      if (key === "joinedDate") {
        const aDate = new Date(aVal as string);
        const bDate = new Date(bVal as string);
        return sortConfig.direction === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        const comparison = aVal.localeCompare(bVal);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }
      return 0;
    });
  }, [filteredStudents, sortConfig]);

  const resetFilters = useCallback(() => {
    setTokenRemainingOp(">");
    setTokenRemainingVal(null);
    setStatusFilter([]);
    setJoinedDateOp(">");
    setJoinedDateVal("");
  }, []);

  const handleSelectJoinedDate = useCallback((selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setJoinedDateVal(formatDateToISO(selectedDate));
      setOpen(false);
    }
  }, []);

  return {
    search, setSearch,
    filterOpen, setFilterOpen,
    tokenRemainingOp, setTokenRemainingOp,
    tokenRemainingVal, setTokenRemainingVal,
    statusFilter, setStatusFilter,
    joinedDateOp, setJoinedDateOp,
    joinedDateVal,
    open, setOpen,
    date,
    handleSelectJoinedDate,
    sortConfig, requestSort,
    filtersActive,
    resetFilters,
    sortedStudents,
  };
}