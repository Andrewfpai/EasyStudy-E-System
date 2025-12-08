   import { getStudentById } from "@/lib/api"; // Ensure updateStudentTokens is defined
  
   import { SidebarTrigger } from "@/components/ui/sidebar";
   import Link from "next/link";
   import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
   import Info from "./Info";
   import Image from 'next/image';
   import ProfilePicture from "@/assets/profilePicture.png";
   import { Phone, SquarePen } from "lucide-react";

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
         <div className="flex flex-col px-8 mt-4 text-E-black bg-background">
           <div className="flex flex-row gap-2 items-center mb-4">
             <SidebarTrigger className="py-2 -ml-2" />
             <div className="w-px h-5 bg-gray-300 mx-2"></div>
             <div className="font-semibold text-lg">Student Information</div>
           </div>
      
             <div className="flex flex-col">

               <div className="relative w-28 h-28">
                 <Image
                   src={ProfilePicture}
                   alt="profile picture"
                   fill
                   className="rounded-full object-cover"
                 />
                 <div
                   className={`absolute bottom-1.5 right-2 h-6 w-6 rounded-full ml-1 ${
                     student.status === "Aktif"
                       ? "bg-primary"
                       : student.status === "Keluar"
                       ? "bg-tertiary"
                       : "bg-secondary"
                   }`}
                 ></div>
               </div>

              <div className="flex flex-row mt-5">
               <div className="flex flex-col gap-2">
                  <div className="text-2xl font-extrabold ">{student?.name}</div>
                  <div className="text-xl font-medium text-E-gray">{student?.email}</div>
               </div>

              <div className="flex flex-row items-center ml-5 gap-3">
                <div>
                  <button className="flex flex-row gap-2 items-center bg-[#F0FEEC] text-primary px-6 py-2 rounded-lg text-sm cursor-pointer border border-primary  hover:bg-transparent  ">
                      <SquarePen className="w-5 h-5"/>
                      <Link href={`/students/${student.id}/edit`}>Edit</Link>
                  </button>
                </div>
                <div>
                  <button className="flex flex-row gap-2 items-center px-6 py-2 rounded-lg text-sm cursor-pointer border border-E-gray-b  hover:bg-transparent  ">
                      <Phone className="w-5 h-5"/>
                      <Link target="_blank" href={`https://wa.me/${student?.phoneNumber}`}>Hubungi Murid</Link>
                  </button>
                </div>
              </div>
              </div>
             </div>
            
          
           <Info studentsInput={student} />
         </div>
       );
     } catch (error) {
        console.error("Error fetching student:", error);

        const message = error instanceof Error ? error.message : String(error);

        return <div>Error loading student data: {message}</div>;
      }

   }
   