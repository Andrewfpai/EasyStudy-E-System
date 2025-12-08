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

interface TokenHistoryProps {
  studentsInput: Student;
}


export default function TokenHistory({ studentsInput }: TokenHistoryProps) {
    const [student, setStudent] = useState<Student>(studentsInput);

    console.log("studentetttttt",student)

  return (

   
<div className="flex flex-col w-full">
      <div className="flex flex-col bg-white rounded-2xl py-4 mt-8 ">
      <h2 className="font-extrabold text-2xl px-6">Riwayat Pembayaran</h2>
      <div className="overflow-auto max-h-[500px] mx-6 mt-4">
        <Table className="w-full bg-white">
          <TableHeader className="">
            <TableRow className="grid grid-cols-3 text-E-gray">
              <TableHead className="px-6 py-3 text-left  font-semibold cursor-pointer">Tanggal & Waktu</TableHead>
              <TableHead className="px-6 py-3  font-semibold cursor-pointer">Invoice</TableHead>
              <TableHead className="px-6 py-3 text-center   font-semibold cursor-pointer">Penambahan Token</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" border border-background">
            {(student?.tokenAddHistory || [])?.map((tokenAdd, index)=>{
                        const formatted = formatForDisplay(tokenAdd.createdAt);
                        console.log(formatted)
                        return (
                        <TableRow className="grid grid-cols-3 border border-background" key={index}>
                            <TableCell className="px-6 py-4 font-semibold">{formatted?.date}{` (${formatted?.time})`}</TableCell>
                            <TableCell className="px-6 py-4 ">{(student?.payments||[])[index]?.imageUrl ?? "No proof"}</TableCell>
                            <TableCell className="px-6 py-4 text-center">{tokenAdd?.tokenAmount ?? "No proof"}</TableCell>

                        </TableRow>
                    )})}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>

  );
}
