"use client";


import Sidebar from "@/components/Sidebar";
import StudentForm from "./StudentForm";

export default function Page() {
 
  return (
    <div className="flex flex-row">
      <Sidebar/>
            <div className="mr-72"></div>

      <StudentForm/>
    </div>
  );
}
