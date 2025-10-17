"use client";

import { useState } from "react";
// import StudentList from "./components/StudentList";
// import StudentForm from "./components/StudentForm";
import StudentsPage from "./students";
import Sidebar from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Page() {
 
  return (
    <div className="flex flex-col ml-8 mt-4">

        <div className="flex flex-row gap-2 items-center mb-4">
            <SidebarTrigger className="py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Students Database</div>
        </div>
            <StudentsPage/>
     

    </div>
  );
}
