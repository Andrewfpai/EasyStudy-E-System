"use client";
import { useEffect, useState } from "react";
import { getStudents } from "../../../lib/api";
import { useRouter } from "next/navigation";
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

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [tokenUsedOp, setTokenUsedOp] = useState(">");
  const [tokenUsedVal, setTokenUsedVal] = useState<number | null>(null);

  const [tokenRemainingOp, setTokenRemainingOp] = useState(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]); 
  // Example: ["ACTIVE", "TEMP_INACTIVE"]

  const [joinedDateOp, setJoinedDateOp] = useState(">");
  const [joinedDateVal, setJoinedDateVal] = useState<string>(""); // store as YYYY-MM-DD

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  



  function compare(val: number, op: string, target: number) {
    if (target == null) return true; // no filter applied
    switch (op) {
      case ">": return val > target;
      case "<": return val < target;
      case "=": return val === target;
      default: return true;
    }
  }

  function compareDate(val: string, op: string, target: string) {
    if (!target) return true;
    const v = new Date(val);
    const t = new Date(target);
    if (isNaN(v.getTime()) || isNaN(t.getTime())) return true;
    return op === ">" ? v > t : v < t;
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.hanziName?.toLowerCase().includes(search.toLowerCase()) ||
      student.pinyinName?.toLowerCase().includes(search.toLowerCase()) ||
      String(student.phoneNumber).includes(search);

    const matchesTokenUsed = compare(student.tokenUsed, tokenUsedOp, tokenUsedVal!);
    const matchesTokenRemaining = compare(student.tokenRemaining, tokenRemainingOp, tokenRemainingVal!);

    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(student.status);

    const matchesJoinedDate = compareDate(student.joinedDate, joinedDateOp, joinedDateVal);

    // FINAL SEARCH RESULTS
    return matchesSearch && matchesTokenUsed && matchesTokenRemaining && matchesStatus && matchesJoinedDate;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig) return 0;

    let aVal: any = a[sortConfig.key as keyof Student];
    let bVal: any = b[sortConfig.key as keyof Student];

    // Special case: joinedDate → compare as Date
    if (sortConfig.key === "joinedDate") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    // Special case: id → numeric comparison
    if (sortConfig.key === "id") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    // Default: string comparison in alphabetical order
    if (typeof aVal === "string" && typeof bVal === "string") {
      const comparison = aVal.localeCompare(bVal);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    // Fallback for numbers/dates
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });



  useEffect(() => {
    getStudents().then(res => {
      if (Array.isArray(res.data)) setStudents(res.data);
    });
  }, []);

  // const filteredStudents = students.filter(student =>
  //   student.name.toLowerCase().includes(search.toLowerCase()) ||
  //   student.hanziName?.toLowerCase().includes(search.toLowerCase()) ||
  //   student.pinyinName?.toLowerCase().includes(search.toLowerCase()) ||
  //   student.phoneNumber?.toString()?.includes(search)
  // );

  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  console.log("student:",students);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Name, Hanzi, or Pinyin"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Token Used Filter */}
      <div className="flex items-center gap-2 mb-2">
        <label>Token Used:</label>
        <select value={tokenUsedOp} onChange={(e) => setTokenUsedOp(e.target.value)}>
          <option value=">">{" > "}</option>
          <option value="<">{" < "}</option>
          <option value="=">{" = "}</option>
        </select>
        <input
          type="number"
          value={tokenUsedVal ?? ""}
          onChange={(e) => setTokenUsedVal(e.target.value ? parseInt(e.target.value) : null)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Token Remaining Filter */}
      <div className="flex items-center gap-2 mb-2">
        <label>Token Remaining:</label>
        <select value={tokenRemainingOp} onChange={(e) => setTokenRemainingOp(e.target.value)}>
          <option value=">">{" > "}</option>
          <option value="<">{" < "}</option>
          <option value="=">{" = "}</option>
        </select>
        <input
          type="number"
          value={tokenRemainingVal ?? ""}
          onChange={(e) => setTokenRemainingVal(e.target.value ? parseInt(e.target.value) : null)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 mb-2">
        <label>Status:</label>
        {["ACTIVE", "TEMP_INACTIVE", "OUT"].map(s => (
          <label key={s} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={statusFilter.includes(s)}
              onChange={(e) => {
                if (e.target.checked) setStatusFilter([...statusFilter, s]);
                else setStatusFilter(statusFilter.filter(st => st !== s));
              }}
            />
            {s}
          </label>
        ))}
      </div>

      {/* Joined Date Filter */}
      <div className="flex items-center gap-2 mb-2">
        <label>Joined Date:</label>
        <select value={joinedDateOp} onChange={(e) => setJoinedDateOp(e.target.value)}>
          <option value=">">{" > "}</option>
          <option value="<">{" < "}</option>
        </select>
        <input
          type="date"
          value={joinedDateVal}
          onChange={(e) => setJoinedDateVal(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>


      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => requestSort("id")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              ID {sortConfig?.key === "id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              onClick={() => requestSort("name")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Name {sortConfig?.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              onClick={() => requestSort("hanziName")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Hanzi Name {sortConfig?.key === "hanziName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              onClick={() => requestSort("pinyinName")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Pinyin Name {sortConfig?.key === "pinyinName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th
              onClick={() => requestSort("tokenUsed")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Tokens Used {sortConfig?.key === "tokenUsed" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              onClick={() => requestSort("tokenRemaining")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Tokens Remaining {sortConfig?.key === "tokenRemaining" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th
            onClick={() => requestSort("joinedDate")}
            className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
            Joined Date {sortConfig?.key === "joinedDate" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedStudents.map(student => (
            <tr
              key={student.id}
              className="hover:bg-gray-50 transition cursor-pointer"
              onClick={() => router.push(`/students/${student.id}`)}
            >
              <td className="px-6 py-4 text-sm text-gray-600">{student.id}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.hanziName}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.pinyinName}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.address}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.phoneNumber}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.tokenUsed}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.tokenRemaining}</td>
              <td className={`px-6 py-4 text-sm font-semibold ${
                student.status === "ACTIVE" ? "text-green-600" :
                student.status === "OUT" ? "text-red-600" :
                "text-yellow-600"
              }`}>
                {student.status}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.joinedDate}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.updatedAt || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
