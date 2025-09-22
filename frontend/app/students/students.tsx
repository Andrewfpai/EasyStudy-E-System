"use client";

import { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

export default function StudentsPage() {
  // const [refresh, setRefresh] = useState(0);

  // const handleStudentAdded = () => setRefresh(prev => prev + 1);

  return (
    <div className="overflow-x-auto">
      <h1>Students</h1>
      {/* <StudentForm onStudentAdded={handleStudentAdded} /> */}
      {/* key refresh forces StudentList to reload data */}
      <StudentList/>
    </div>
  );
}
