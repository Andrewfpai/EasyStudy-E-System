"use client";
import { useEffect, useState } from "react";
import { getStudents, updateStudentTokens } from "@/lib/api"; // import API
import { useRouter } from "next/navigation";
import Link from "next/link";

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
}

export default function Absensi() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [tokenInput, setTokenInput] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getStudents().then(res => {
      if (Array.isArray(res.data)) setStudents(res.data);
    });
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.hanziName?.toLowerCase().includes(search.toLowerCase()) ||
    student.pinyinName?.toLowerCase().includes(search.toLowerCase()) ||
    String(student.phoneNumber).includes(search)
  );

  const toggleSelect = (student: Student) => {
    if (selectedStudents.find(s => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  async function modifyTokens(type: "add" | "subtract") {
    if (!tokenInput || loading) return;
    setLoading(true);

    try {
      const updatedStudents = await Promise.all(
        selectedStudents.map(async (student) => {
          const change = type === "add" ? tokenInput : -tokenInput;

          // call backend
          const updated = await updateStudentTokens(student.id, change);

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
    <div className="bg-white rounded-lg shadow-md p-4">
      <input
        type="text"
        placeholder="Search by Name, Hanzi, or Pinyin"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Bulk Token Controls */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={tokenInput ?? ""}
          onChange={e => setTokenInput(e.target.value ? parseInt(e.target.value) : null)}
          placeholder="Token amount"
          className="border px-2 py-1 rounded w-32"
        />
        <button
          className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50"
          onClick={() => modifyTokens("add")}
          disabled={loading}
        >
          Add Token
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded disabled:opacity-50"
          onClick={() => modifyTokens("subtract")}
          disabled={loading}
        >
          Subtract Token
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Select</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hanzi Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pinyin Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tokens Used</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tokens Remaining</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredStudents.map(student => {
            const isSelected = selectedStudents.some(s => s.id === student.id);
            return (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(student)}
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.hanziName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.pinyinName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.phoneNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.tokenUsed}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.tokenRemaining}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${
                  student.status === "ACTIVE" ? "text-green-600" :
                  student.status === "OUT" ? "text-red-600" :
                  "text-yellow-600"
                }`}>{student.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
