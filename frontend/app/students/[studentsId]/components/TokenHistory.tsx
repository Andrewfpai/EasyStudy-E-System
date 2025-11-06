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

   
<div className="flex-[3] min-w-0">
            <h2 className="font-semibold text-xl mt-5 mb-5">Token Add History</h2>
        <div className="overflow-auto max-h-[500px] rounded-md">

            <div className="overflow-auto max-h-[500px] rounded-md border">
                <Table className="w-full bg-white ">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                    
                    <TableHead className="px-8 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Date</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Amount</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Invoice</TableHead>
                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                    {(student?.tokenAddHistory || [])?.map((tokenAdd, index)=>{
                        const formatted = formatForDisplay(tokenAdd.createdAt);
                        console.log(formatted)
                        return (
                        <TableRow key={index}>
                            <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{formatted?.date}{` (${formatted?.time})`}</TableCell>
                            <TableCell className="px-6 py-4 text-sm text-gray-600">{tokenAdd?.tokenAmount ?? "No proof"}</TableCell>
                            <TableCell className="px-6 py-4 text-sm text-gray-600">{(student?.payments||[])[index]?.imageUrl ?? "No proof"}</TableCell>

                        </TableRow>
                    )})}
        
                </TableBody>
                </Table>
            </div>
        </div>

        
</div>

  );
}
