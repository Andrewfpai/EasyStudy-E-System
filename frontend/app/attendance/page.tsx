

// import StudentList from "./components/StudentList";
// import StudentForm from "./components/StudentForm";


import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Absensi from "./Absensi";
import { getStudents } from "@/lib/api";
import { Student } from "@/app/types/student";


export default async function Page() {
 const student = await getStudents();
 console.log(student)
  return (
    <div className="flex flex-col ml-8 mt-4">

        <div className="flex flex-row gap-2 items-center mb-4 text-E-black bg-background">
            <SidebarTrigger className="py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Students Database</div>
        </div>
          
        <Absensi studentsInput={student}/>

    </div>
  );
}
