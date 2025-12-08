"use client"

import { useState } from "react";

import { formatForDisplay } from "@/utils/date";
import { Student } from "@/app/types/student";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TokenAttendanceProps {
  studentsInput: Student;
}

export default function TokenAttendance({ studentsInput }: TokenAttendanceProps) {
  const [student, setStudent] = useState<Student>(studentsInput);

  console.log(student)

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col bg-white rounded-2xl py-4 mt-8 ">
      <h2 className="font-extrabold text-2xl px-6">Riwayat Kehadiran</h2>
      <div className="overflow-auto max-h-[500px] mx-6 mt-4">
        <Table className="w-full bg-white">
          <TableHeader className="">
            <TableRow className="grid grid-cols-4 text-E-gray">
              <TableHead className="px-6 py-3 text-left  font-semibold cursor-pointer">Tanggal & Waktu</TableHead>
              <TableHead className="px-6 py-3 text-center  font-semibold cursor-pointer">Jumlah Token</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-background">
            {(student?.tokenUsageHistory|| []).map((tokenUsage, index) => {
              const formatted = formatForDisplay(tokenUsage?.createdAt);
              return (
                <TableRow key={index} className="grid grid-cols-4 border border-background">
                  <TableCell className="px-6 py-4 font-semibold">
                    {formatted?.date} ({formatted?.time})
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    {tokenUsage?.tokenAmount ?? "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
}
