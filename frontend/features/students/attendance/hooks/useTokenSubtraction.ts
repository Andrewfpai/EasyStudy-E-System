import { useState } from "react";
import { Student } from "@/types/student";
import { subtractStudentTokens } from "@/lib/api";

interface UseTokenSubtractionArgs {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  selectedStudents: Student[];
  clearSelection: () => void;
}

export function useTokenSubtraction({
  students,
  setStudents,
  selectedStudents,
  clearSelection,
}: UseTokenSubtractionArgs) {
  const [tokenInput, setTokenInput] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function subtractTokens() {
    if (!tokenInput || loading || selectedStudents.length === 0) return;

    setLoading(true);

    const optimisticUpdate = selectedStudents.map((student) => ({
      ...student,
      tokenRemaining: student.tokenRemaining - tokenInput,
    }));

    setStudents((prev) =>
      prev.map((student) => optimisticUpdate.find((u) => u.id === student.id) || student)
    );

    const selectedCopy = [...selectedStudents];
    clearSelection();
    setTokenInput(null);

    try {
      await Promise.all(
        selectedCopy.map((student) => subtractStudentTokens(student.id, tokenInput))
      );
    } catch (err) {
      console.error("Error updating tokens:", err);
      setStudents((prev) =>
        prev.map((student) => selectedCopy.find((s) => s.id === student.id) || student)
      );
      alert("Failed to subtract tokens for some students. Reverted changes.");
    } finally {
      setLoading(false);
    }
  }

  return { tokenInput, setTokenInput, loading, subtractTokens };
}