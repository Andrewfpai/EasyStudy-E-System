"use client";
import { useEffect, useState } from "react";
import { getStudents } from "@/lib/api"
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

export default function StudentListHome() {
  const [students, setStudents] = useState<Student[]>([]);

  const [tokenRemainingOp, setTokenRemainingOp] = useState(">");
  const [tokenRemainingVal, setTokenRemainingVal] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]); 
  // const [search, setSearch] = useState(3);
  const router = useRouter();

  useEffect(() => {
    getStudents().then(res => {
      if (Array.isArray(res.data)) {
        console.log("test",res.data)
        setStudents(res.data);
      }
    });
  }, []);

  function compare(val: number, op: string, target: number) {
    if (target == null) return true; // no filter applied
    switch (op) {
      case ">": return val > target;
      case "<": return val < target;
      case "=": return val === target;
      default: return true;
    }
  }


  const filteredStudents = students.filter(student =>{
    const matchesTokenRemaining = compare(student.tokenRemaining, tokenRemainingOp, tokenRemainingVal!);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(student.status);
    return matchesTokenRemaining && matchesStatus;
  }
    // student.tokenRemaining <= Number(tokenCount)
  );

  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  console.log("student:",students);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Search input */}
      {/* PAKE DROPDOWN */}
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

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hanzi Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pinyin Name</th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tokens Remaining</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact Them</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredStudents.map(student => (
            <tr
              key={student.id}
              className="hover:bg-gray-50 transition cursor-pointer"
              // onClick={() => router.push(`/students/${student.id}`)}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.hanziName}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.pinyinName}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.phoneNumber}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.tokenRemaining}</td>
              <td className={`px-6 py-4 text-sm font-semibold ${
                student.status === "ACTIVE" ? "text-green-600" :
                student.status === "OUT" ? "text-red-600" :
                "text-yellow-600"
              }`}>
                {student.status}
              </td>
              <td>
              <Link href={`https://wa.me/${student.phoneNumber}`}>
                <button className="px-[20px] ...">Hubungi Kami</button>
              </Link>
            </td>
                

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
