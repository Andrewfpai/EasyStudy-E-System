"use client"
import { getStudentById, updateStudentTokens } from "@/lib/api";
import { useState } from "react";
import Details from "../Details";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link"
import { formatForDisplay } from "@/utils/date";

interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  phoneNumber: number;
  tokenUsed: number;
  tokenRemaining: number;
  joinedDate: string;
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function TokenHistory({ student: initialStudent }) {
    const [student, setStudent] = useState(initialStudent);


  return (

   
<div className="flex-[3] min-w-0">
            <h2 className="font-semibold text-xl mt-5 mb-5">Token Add History</h2>
        <div className="overflow-auto max-h-[500px] rounded-md">

            <div className="overflow-auto max-h-[500px] rounded-md">
                <Table className="w-full bg-white ">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                    
                    <TableHead className="px-8 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Date</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Amount</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer">Invoice</TableHead>
                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                    {student.tokenAddHistory.map((tokenAdd, index)=>{
                        const formatted = formatForDisplay(tokenAdd.createdAt);
                        console.log(formatted)
                        return (
                        <TableRow key={index}>
                            <TableCell className="px-6 py-4 text-sm text-gray-600 text-center">{formatted?.date}{` (${formatted?.time})`}</TableCell>
                            <TableCell className="px-6 py-4 text-sm text-gray-600">{tokenAdd?.tokenAmount ?? "No proof"}</TableCell>
                            <TableCell className="px-6 py-4 text-sm text-gray-600">{student?.payments[index]?.imageUrl ?? "No proof"}</TableCell>

                        </TableRow>
                    )})}
        
                </TableBody>
                </Table>
            </div>
        </div>

        
</div>

  );
}
