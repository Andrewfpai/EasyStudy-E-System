   import { getStudentById, updateStudentTokens } from "@/lib/api"; // Ensure updateStudentTokens is defined
   import Details from "./Details";
   import { SidebarTrigger } from "@/components/ui/sidebar";
   import Link from "next/link";
   import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
   import Info from "./Info";
   import Image from 'next/image';
   import ProfilePicture from "@/assets/profilePicture.png";

   // Use the complete Student interface from lib/api.ts
   interface Student {
     id: number;
     name: string;
     hanziName: string | null;
     pinyinName: string | null;
     email: string;
     address: string;
     phoneNumber: number;
     tokenUsed: number;
     tokenRemaining: number;
     joinedDate: string;
     status: "ACTIVE" | "OUT" | "TEMP_INACTIVE";
   }

   export default async function StudentPage(props: { params: Promise<{ studentsId: string }> }) {
     // Await the params Promise
     const params = await props.params;
     const { studentsId } = params;

     // Validate the ID before proceeding
     if (!studentsId || isNaN(parseInt(studentsId, 10))) {
       return <div>Invalid student ID.</div>;
     }

     try {
       // Pass studentsId as string (getStudentById will parse it)
       const student = await getStudentById(studentsId);

       return (
         <div className="flex flex-col px-8 mt-4">
           <div className="flex flex-row gap-2 items-center mb-4">
             <SidebarTrigger className="py-2 -ml-2" />
             <div className="w-px h-5 bg-gray-300 mx-2"></div>
             <div className="font-semibold text-lg">Student Information</div>
           </div>
           <div className="flex flex-row">
             <div className="flex flex-col">
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
                 <div
                   className={`h-5 w-5 rounded-full ml-1 ${
                     student.status === "ACTIVE"
                       ? "bg-green-600"
                       : student.status === "OUT"
                       ? "bg-red-600"
                       : "bg-yellow-600"
                   }`}
                 ></div>
               </div>
               <div className="text-gray-500">{student?.email}</div>
             </div>
             <div className="flex items-end ml-5">
               <div className="bg-red-500 text-white px-4 py-1 rounded disabled:opacity-50 text-lg">
                 <Link href={`/students/${student.id}/edit`}>Edit</Link>
               </div>
             </div>
           </div>
           <Info student={student} />
         </div>
       );
     } catch (error) {
       console.error("Error fetching student:", error);
       return <div>Error loading student data: {error.message}</div>;
     }
   }
   