


// import StudentList from "./components/StudentList";
// import StudentForm from "./components/StudentForm";


import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import Info from "./Info";
import { getStudentById } from "@/lib/api";

import { PageProps } from "next"; // optional, if needed

type Props = {
  params: { studentsId: string };
};


export default async function Page({ params }: { params: { studentsId: string } }) {
    // console.log("TYPE", typeof(params))
    // const resolvedParams = params;
    const studentId = parseInt(params.studentsId, 10);
    const student = await getStudentById(studentId.toString());
    return (
    <div className="flex flex-col px-8 mt-4">

        <div className="flex flex-row gap-2 items-center mb-4">
            <SidebarTrigger className="py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Students Database</div>
        </div>
          
            <Info student={student}/>

    </div>
  );
}
