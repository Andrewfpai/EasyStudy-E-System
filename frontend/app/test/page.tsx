"use client";


import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import StudentForm from "./StudentForm";

export default function Page() {
 
  return (
    <div className="flex flex-col px-5">
      
        <Table className="bg-white">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                    >Name 
                  </TableHead>
                  
                  <TableHead
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                    >Hanzi 
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  
                  <TableRow 
                    
                    // onClick={() => router.push(`/students/${student.id}`)}
                  >
                    
                    <TableCell className="px-6 py-4 text-sm text-gray-600">Nicolas Andrew Febrian Pai</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">yang han xing</TableCell>
                   
                  </TableRow>
                
              </TableBody>
            </Table>


    </div>
    

  );
}
