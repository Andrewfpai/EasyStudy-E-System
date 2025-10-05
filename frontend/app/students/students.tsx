"use client";

import { useState } from "react";
import StudentTable from "./components/StudentList";
// import StudentForm from "./components/StudentForm";

export default function StudentsPage() {
  // const [refresh, setRefresh] = useState(0);

  // const handleStudentAdded = () => setRefresh(prev => prev + 1);

  return (
    <div className="overflow-x-auto">
      {/* <StudentForm onStudentAdded={handleStudentAdded} /> */}
      {/* key refresh forces StudentList to reload data */}
      <StudentTable/>
    </div>
  );
}
