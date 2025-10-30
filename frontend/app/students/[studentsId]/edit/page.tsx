import { SidebarTrigger } from "@/components/ui/sidebar";
import Info from "./Info";
import { getStudentById } from "@/lib/api";

export default async function Page({ params }: { params: { studentsId: string } }) {
    const student = await getStudentById(params.studentsId);

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
