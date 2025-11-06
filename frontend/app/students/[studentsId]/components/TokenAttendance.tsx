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
    <div className="flex-[2] min-w-0 text-E-black">
      <h2 className="font-semibold text-xl mt-5 mb-5">Attendance Record</h2>
      <div className="overflow-auto max-h-[500px] rounded-md bg-gray-100 border">
        <Table className="w-full bg-white">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-8 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Date</TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Token Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(student?.tokenUsageHistory|| []).map((tokenUsage, index) => {
              const formatted = formatForDisplay(tokenUsage?.createdAt);
              return (
                <TableRow key={index}>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">
                    {formatted?.date} ({formatted?.time})
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">
                    {tokenUsage?.tokenAmount ?? "No proof"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

