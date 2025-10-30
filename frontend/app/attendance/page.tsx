

// import StudentList from "./components/StudentList";
// import StudentForm from "./components/StudentForm";


import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Absensi from "./Absensi";
import { getStudents } from "@/lib/api";

export default async function Page() {
 const student = await getStudents();
  return (
    <div className="flex flex-col ml-8 mt-4">

        <div className="flex flex-row gap-2 items-center mb-4">
            <SidebarTrigger className="py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Students Database</div>
        </div>
          
        <Absensi studentsInput={student?.data}/>

    </div>
  );
}
