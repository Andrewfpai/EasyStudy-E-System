"use client";


import Sidebar from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import StudentForm from "./StudentForm";

export default function Page() {
 
  return (
    <div className="flex flex-col">
      
        <div className="flex flex-row gap-2 p-2 items-center">
            <SidebarTrigger className="pr-2 py-2 -ml-2"/>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <div className="font-semibold text-lg">Students Database</div>
        </div>
         <div className="flex flex-col h-[600px] bg-gray-200 rounded-lg px-2 py-4">
            {/* Title and buttons — always visible */}
            <div className="flex flex-row items-center justify-between mb-2">
                <div className="font-bold text-2xl ml-5">Student Table</div>
                <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-500 rounded-md">Filters</button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border border-gray-400 rounded-md"
                />
                </div>
            </div>

            {/* Scrollable box only */}
            <div className="overflow-auto border bg-gray-100 flex-1">
                <div className="w-[2500px] bg-yellow-100 h-32"></div>
                {/* Or your table here */}
            </div>
        </div>


    </div>
    

  );
}
