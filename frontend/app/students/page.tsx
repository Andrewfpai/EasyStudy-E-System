"use client";

import { useState } from "react";
// import StudentList from "./components/StudentList";
// import StudentForm from "./components/StudentForm";
import StudentsPage from "./students";
import Sidebar from "@/components/Sidebar";

export default function Page() {
 
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="mr-72"></div>
      <StudentsPage/>
    </div>
  );
}
