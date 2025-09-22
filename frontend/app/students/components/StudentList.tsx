"use client";
import { useEffect, useState } from "react";
import { getStudents } from "../../../lib/api";
import { useRouter } from "next/navigation";
interface Student {
  id: number;
  name: string;
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
  const router = useRouter();

  useEffect(() => {
    getStudents().then(res => {
      if (Array.isArray(res.data)) setStudents(res.data);
    });
  }, []);

  if (students.length === 0) return <p className="text-gray-500">No students found.</p>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tokens Used</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tokens Remaining</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
          </tr>
        </thead>
        {console.log(students)}
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50 transition" onClick={() => router.push(`/students/${student.id}`)}>
              <td className="px-6 py-4 text-sm text-gray-600">{student.id}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
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
              <td className="px-6 py-4 text-sm text-gray-600">{student.updateAt?student.updateAt:"-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
