"use client"
import { getStudentById, updateStudentTokens } from "@/lib/api";
import { useState } from "react";
import Details from "./components/Details";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link"
import TokenHistory from "./components/TokenHistory";
import TokenAttendance from "./components/TokenAttendance";

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

export default function Info({ student: initialStudent }) {
    const [student, setStudent] = useState(initialStudent);
    const [tab, setTab] = useState(1)


    const handleTab = (number:number)=>{
        switch(number){
            case 1:
                setTab(1)
                break;
            case 2:
                setTab(2)
                break;
            default:
                setTab(1)

        }
    }

    console.log(tab)
  return (
    <div className="mt-5">
        <div className="grid grid-cols-6 items-center gap-5 text-center mb-2">
            <div onClick={()=>handleTab(1)} className={`${tab===1?"":"text-gray-400"}`}>Basic Info</div>
            <div onClick={()=>handleTab(2)} className={`${tab===2?"":"text-gray-400"}`}>Token Info</div>
        </div>
        
        {/* Line Slider */}
        <div className="relative grid grid-cols-6 items-center gap-5 ">
            <div className={`col-span-1 border-b-3 border-black rounded-lg absolute bottom-0 left-0 w-1/6 transition-transform duration-300`} 
                style={{ transform: `translateX(${tab === 1 ? 0 : 100}%)` }}
            ></div>
        </div>

        <div className="border border-gray-400 col-span-2 "></div>



        <div>
  {tab === 1 ? (
    student && <Details student={student} />
  ) : (
    student && 
    <div className="flex flex-row gap-8">
        <TokenAttendance student={student} />
        <TokenHistory student={student} />
        
    </div>
  )}
</div>
    </div>


  );
}
