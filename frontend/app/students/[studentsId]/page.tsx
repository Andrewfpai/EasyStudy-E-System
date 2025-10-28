
import { getStudentById, updateStudentTokens } from "@/lib/api";
import Details from "./Details";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Info from "./Info";
import Image from 'next/image'
import ProfilePicture from "@/assets/profilePicture.png"

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
    // console.log("TEST2=======",student);


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

    <div className="flex flex-col ml-8 mt-4">

        <div className="flex flex-row gap-2 items-center mb-4">
            <SidebarTrigger className="py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Student Information</div>
        </div>
            <div className="flex flex-row">

              <div className="flex flex-col">
                {/* <Image/> */}
                <div className="relative w-28 h-28">
                  <Image
                    src={ProfilePicture}
                    alt="profile picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-row">

                  <div className="text-xl font-semibold mt-2">{student?.name}</div> 
                  <div className={`h-5 w-5 rounded-full ml-1 ${
                    student.status === "ACTIVE" ? "bg-green-600" :
                    student.status === "OUT" ? "bg-red-600" :
                    "bg-yellow-600"
                  }
                    `}></div>
                </div>
                <div className="text-gray-500">{student?.email}</div>
              </div>

              <div className="flex items-end ml-5 ">
                <div className="bg-red-500 text-white px-4 py-1 rounded disabled:opacity-50 text-lg ">
                  <Link href={`/students/${student.id}/edit`}>Edit</Link>
                </div>
              </div>

            </div>

            <Info student={student}/>

            

    </div>
  );
}
