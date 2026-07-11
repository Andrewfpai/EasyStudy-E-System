"use client";

import { useState } from "react";
import Details from "./Details";
import TokenHistory from "./TokenHistory";
import TokenAttendance from "./TokenAttendance";
import AddToken from "./AddToken";
import { Student } from "@/types/student";

interface StudentDetailTabsProps {
  studentsInput: Student;
}

export default function StudentDetailTabs({ studentsInput }: StudentDetailTabsProps) {
  const [student, setStudent] = useState<Student>(studentsInput);
  const [tab, setTab] = useState(1);

  const tabs = [
    { id: 1, label: "Informasi Data Diri" },
    { id: 2, label: "Riwayat Kehadiran" },
    { id: 3, label: "Riwayat Pembayaran" },
    { id: 4, label: "Tambah Token" },
  ];

  return (
    <div className="mt-5 text-E-black">
      <div className="relative">
        <div className="grid grid-cols-4 items-center text-center">
          {tabs.map((t) => (
            <div
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`cursor-pointer py-3 ${tab === t.id ? "text-E-black font-bold" : "text-E-gray"}`}
            >
              {t.label}
            </div>
          ))}
        </div>

        <div className="relative">
          <div
            className="absolute bottom-0 h-1 bg-secondary rounded-lg transition-all duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${((tab - 1) * 100) / tabs.length}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="border border-gray-400 col-span-2"></div>

      <div className="mt-6">
        {tab === 1 && <Details studentsInput={student} />}
        {tab === 2 && <TokenAttendance studentsInput={student} />}
        {tab === 3 && <TokenHistory studentsInput={student} />}
        {tab === 4 && (
          <AddToken
            student={student}
            onUpdate={(updatedStudent) => setStudent(updatedStudent)}
          />
        )}
      </div>
    </div>
  );
}