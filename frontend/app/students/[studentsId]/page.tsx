import { SidebarTrigger } from "@/components/ui/sidebar";
import StudentDetailTabs from "@/features/students/detail/StudentDetailTabs";
import { StudentProfileHeader } from "@/features/students/detail/StudentProfileHeader";
import { getStudentById } from "@/lib/api";

export default async function StudentPage(props: { params: Promise<{ studentsId: string }> }) {
  const params = await props.params;
  const studentId = Number(params.studentsId);

  if (!params.studentsId || isNaN(studentId)) {
    return <div>Invalid student ID.</div>;
  }

  try {
    const student = await getStudentById(studentId);

    return (
      <div className="flex flex-col px-8 mt-4 text-E-black bg-background">
        <div className="flex flex-row gap-2 items-center mb-4">
          <SidebarTrigger className="py-2 -ml-2" />
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          <div className="font-semibold text-lg">Student Information</div>
        </div>

        <StudentProfileHeader student={student} />
        <StudentDetailTabs studentsInput={student} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching student:", error);
    const message = error instanceof Error ? error.message : String(error);
    return <div>Error loading student data: {message}</div>;
  }
}