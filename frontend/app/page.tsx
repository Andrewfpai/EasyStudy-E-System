
// import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
// import AppSidebar from "@/components/Sidebar2";
import AppSidebar from "@/components/sidebar/AppSidebar";
import StudentListHome from "@/components/StudentListHome";
import {  SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    // <div className="flex flex-row">
    //   {/* <Sidebar/> */}
    //   <SidebarWrapper/>
    //   {/* <div className="mr-72"></div> */}
    //   {/* <div className="mr-10"></div> */}

    //   <div className="flex flex-col gap-10">
    //     <div>HEllo</div>
    //     <StudentListHome/>
    //     <Absensi/>
    //   </div>
    // </div>
        <div className="flex flex-col ml-8 mt-4">
        
            <div className="flex flex-row gap-2 items-center mb-4">
                <SidebarTrigger className="py-2 -ml-2"/>
                <div className="w-px h-5 bg-gray-300 mx-2"></div>
                <div className="font-semibold text-lg">Dashboard</div>
            </div>

            <StudentListHome/>

          
    
        </div>

      



       





  );
}
