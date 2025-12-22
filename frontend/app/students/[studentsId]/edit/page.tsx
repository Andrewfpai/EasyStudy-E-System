import { SidebarTrigger } from "@/components/ui/sidebar";
import Info from "./Info";
import { getStudentById } from "@/lib/api";

export default async function Page(props: any) {
  const params = await props.params; 


  const studentId = Number(params.studentsId);

  const student = await getStudentById(studentId);

  return (
    <div className="flex flex-col px-8 mt-4 text-E-black bg-E-white">
      <div className="flex flex-row gap-2 items-center mb-4">
        <SidebarTrigger className="py-2 -ml-2" />
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <div className="font-semibold text-lg">Students Database</div>
      </div>
      <Info student={student} />
    </div>
  );
}
