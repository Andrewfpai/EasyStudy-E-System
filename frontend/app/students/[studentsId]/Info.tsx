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
            case 3:
                setTab(3)
                break;
            default:
                setTab(1)

        }
    }

    console.log(tab)
  return (
    <div className="mt-5 text-E-black">
        <div className="grid grid-cols-3 xl:grid-cols-5 items-center gap-5 text-center mb-2">
            <div onClick={()=>handleTab(1)} className={`${tab===1?"text-E-black font-bold":"text-E-gray"} cursor-pointer`}>Informasi Data Diri</div>
            <div onClick={()=>handleTab(2)} className={`${tab===2?"text-E-black font-bold":"text-E-gray"} cursor-pointer`}>Riwayat Kehadiran</div>
            <div onClick={()=>handleTab(3)} className={`${tab===3?"text-E-black font-bold":"text-E-gray"} cursor-pointer`}>Riwayat Pembayaran</div>
        </div>
        
        {/* Line Slider */}
        <div className="relative grid grid-cols-4 lg:grid-cols-5 items-center gap-5 ">
            <div className={`col-span-1 border-b-5 border-secondary rounded-lg absolute bottom-0 left-0 w-1/3 xl:w-1/5 transition-transform duration-300`} 
                style={{ transform: `translateX(${tab === 1 ? 0 : tab === 2 ? 100 : 200}%)`}}
            ></div>
        </div>

        <div className="border border-gray-400 col-span-2 "></div>



        <div>
  {tab === 1 ? (
    student && <Details studentsInput={student} />
  ) : tab===2? (
    student && <TokenAttendance studentsInput={student} />
  ):(
    student && <TokenHistory studentsInput={student} />
        

  )}
</div>
    </div>


  );
}
