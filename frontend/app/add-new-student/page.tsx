 "use client"; // If needed for interactivity
import { SidebarTrigger } from "@/components/ui/sidebar";
  import StudentForm from "./StudentForm";
  export default function AddStudentPage() {
    const handleStudentAdded = () => {
      // Refresh student list or navigate (e.g., using router.push("/students"))
      console.log("Student added, refreshing...");
    };
    return (
      <div className="flex flex-col px-8 mt-4 text-E-black bg-background">

        <div className="flex flex-row gap-2 items-center mb-4">
            <SidebarTrigger className="py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Register Student</div>
        </div>
            <StudentForm onStudentAdded={handleStudentAdded} />
     

    </div>
    );
  }

  