"use client";

import { useState } from "react";
import Details from "./components/Details";
import TokenHistory from "./components/TokenHistory";
import TokenAttendance from "./components/TokenAttendance";
import TambahToken from "./components/TambahToken";
import { Student } from "@/app/types/student";


interface InfoProps {
  studentsInput: Student;
}

export default function Info({ studentsInput }: InfoProps) {
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
      {/* Tabs */}
      <div className="relative">
        <div className="grid grid-cols-4 items-center text-center ">
          {tabs.map((t) => (
            <div
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`cursor-pointer py-3 ${
                tab === t.id ? "text-E-black font-bold" : "text-E-gray"
              }`}
            >
              {t.label}
            </div>
          ))}
        </div>

        {/* Slider */}
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

      <div className="border border-gray-400 col-span-2 "></div>

      {/* Tab content */}
      <div className="mt-6">
        {tab === 1 && <Details studentsInput={student} />}
        {tab === 2 && <TokenAttendance studentsInput={student} />}
        {tab === 3 && <TokenHistory studentsInput={student} />}
        {tab === 4 && (
          <TambahToken
            student={student}
            onUpdate={(updatedStudent) => setStudent(updatedStudent)}
          />
        )}
      </div>
    </div>
  );
}