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
import SuccessCard from "../add-new-student/SuccessCard";
// import StudentForm from "./StudentForm";

export default function Page() {
 
  return (
    <div className="flex flex-col px-5">
      
        <SuccessCard/>


    </div>
    

  );
}
