import { useCallback, useMemo, useState } from "react";
import { Student } from "@/types/student";

export const STATUS_OPTIONS = ["Aktif", "Nonaktif", "Keluar"] as const;
export type StatusOption = (typeof STATUS_OPTIONS)[number];

type TokenOp = ">" | "<" | "=";
type SortConfig = { key: keyof Student; direction: "asc" | "desc" };

interface UseStudentFiltersReturn {
  tokenRemainingOp: TokenOp;
  setTokenRemainingOp: (op: TokenOp) => void;
  tokenRemainingVal: number | null;
  setTokenRemainingVal: (val: number | null) => void;

  statusFilter: string[];
  toggleStatusFilter: (status: string, checked: boolean) => void;

  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;

  sortedStudents: Student[];

  statusOptions: readonly StatusOption[];
}

export function useStudentFilters(students: Student[]): UseStudentFiltersReturn {
  const [tokenRemainingOp, setTokenRemainingOp] = useState<TokenOp>(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "id", direction: "asc" });

  const compareToken = useCallback(
    (student: Student) => {
      if (tokenRemainingVal === null) return true;
      switch (tokenRemainingOp) {
        case ">":
          return student.tokenRemaining > tokenRemainingVal;
        case "<":
          return student.tokenRemaining < tokenRemainingVal;
        case "=":
          return student.tokenRemaining === tokenRemainingVal;
        default:
          return true;
      }
    },
    [tokenRemainingOp, tokenRemainingVal]
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(student.status);
      const matchesToken = compareToken(student);
      return matchesStatus && matchesToken;
    });
  }, [students, statusFilter, compareToken]);

  const sortedStudents = useMemo(() => {
    if (!sortConfig) return filteredStudents;

    const { key, direction } = sortConfig;
    return [...filteredStudents].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (key === "joinedDate") {
        const aDate = new Date(aVal as string).getTime();
        const bDate = new Date(bVal as string).getTime();
        return direction === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        const comparison = aVal.localeCompare(bVal);
        return direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });
  }, [filteredStudents, sortConfig]);

  const toggleStatusFilter = useCallback((status: string, checked: boolean) => {
    setStatusFilter((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
  }, []);

  return {
    tokenRemainingOp,
    setTokenRemainingOp,
    tokenRemainingVal,
    setTokenRemainingVal,
    statusFilter,
    toggleStatusFilter,
    sortConfig,
    setSortConfig,
    sortedStudents,
    statusOptions: STATUS_OPTIONS,
  };
}