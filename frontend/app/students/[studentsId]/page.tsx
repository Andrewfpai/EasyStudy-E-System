import Sidebar from "@/components/Sidebar";
import { getStudentById, updateStudentTokens } from "@/lib/api";
import Details from "./components/Details";

interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  phoneNumber: number;
  tokenUsed: number;
  tokenRemaining: number;
  joinedDate: string;
}

export default async function StudentPage({ params }: { params: { studentsId: string } }) {
  const resolvedParams = await params;
  const studentId = parseInt(resolvedParams.studentsId, 10);

  const student = await getStudentById(studentId);
    // console.log("student",student);


//   if (!student) return <div className="flex flex-row"><Sidebar /><div className="p-6">Loading...</div></div>;

//   async function handleUpdateTokens(change: number) {
//     try {
//       const updated = await updateStudentTokens(studentId, change);
//       setStudent((prev) => prev ? { ...prev, tokenUsed: updated.tokenUsed, tokenRemaining: updated.tokenRemaining } : prev);
//     } catch (err) {
//       console.error(err);
//     }
//   }

  return (
    <div className="flex flex-row w-full">
      <Details student={student}/> 
    </div>
  );
}
