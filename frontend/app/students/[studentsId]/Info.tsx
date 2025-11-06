"use client"

import { useState } from "react";
import Details from "./components/Details";

import TokenHistory from "./components/TokenHistory";
import TokenAttendance from "./components/TokenAttendance";
import { Student } from "@/app/types/student";

interface InfoProps {
  studentsInput: Student;
}

export default function Info({ studentsInput }: InfoProps) {
    const [student, setStudent] = useState<Student>(studentsInput);
    const [tab, setTab] = useState(1)

  console.log("Student",student)
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
    <div className="mt-5 text-E-black">
        <div className="grid grid-cols-4 lg:grid-cols-5 items-center gap-5 text-center mb-2">
            <div onClick={()=>handleTab(1)} className={`${tab===1?"text-E-black":"text-E-muted-gray"}`}>Basic Info</div>
            <div onClick={()=>handleTab(2)} className={`${tab===2?"text-E-black":"text-E-muted-gray"}`}>Token Info</div>
        </div>
        
        {/* Line Slider */}
        <div className="relative grid grid-cols-4 lg:grid-cols-5 items-center gap-5 ">
            <div className={`col-span-1 border-b-3 border-E-black rounded-lg absolute bottom-0 left-0 w-1/4 lg:w-1/5 transition-transform duration-300`} 
                style={{ transform: `translateX(${tab === 1 ? 0 : 100}%)` }}
            ></div>
        </div>

        <div className="border border-gray-400 col-span-2 "></div>



        <div>
  {tab === 1 ? (
    student && <Details studentsInput={student} />
  ) : (
    student && 
    <div className="flex flex-row gap-8">
        <TokenAttendance studentsInput={student} />
        <TokenHistory studentsInput={student} />
        
    </div>
  )}
</div>
    </div>


  );
}
