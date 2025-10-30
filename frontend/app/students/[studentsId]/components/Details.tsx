"use client"
import { useState } from "react";
import { updateStudentData, addTokensWithPayment } from "@/lib/api";
import { formatDate, formatDateToISO, formatForDisplay } from "@/utils/date";
import Link from "next/link"

export default function Details({ student: initialStudent }) {
  const [student, setStudent] = useState(initialStudent);
 
  console.log("student: ",student)


  return (
    <div className="flex flex-col w-full">
      
      

      <div className="flex flex-col bg-gray-100 rounded-lg border border-gray-200 py-4 mt-8 max-w-[700px]">
        <div className="font-semibold text-xl px-6">Personal Details</div>

        <div className="grid grid-rows-2 border-t border-gray-400 mt-4 mt-3 col-span-2 " ></div>

          <div className="flex flex-col divide-y-2 divide-dashed divide-gray-200">
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">{`Name(ID):`}</p>
              <p className="font-medium col-start-2 col-span-full">{`${student.name}(${student.id})`}</p>
            </div>
            {/* <div className=" divide-y-3 divide-dashed divide-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">{`Chinese Name:`}</p>
              <p className="font-medium col-start-2 col-span-full">{`${student.hanziName}(${student.pinyinName})`}</p>
            </div>
            {/* <div className="border-t border-dashed border-gray-400 my-3 col-span-2"></div> */}

            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Email:</p>
              <p className="font-medium col-start-2 col-span-full">{student.email}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Phone:</p>
              <p className="font-medium col-start-2 col-span-full">{student.phoneNumber}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}

            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Address:</p>
              <p className="font-medium col-start-2 col-span-full">{student.address}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Tokens Used:</p>
              <p className="font-medium col-start-2 col-span-full">{student.tokenUsed}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Tokens Remaining:</p>
              <p className="font-medium col-start-2 col-span-full">{student.tokenRemaining}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Joined Date:</p>
              <p className="font-medium col-start-2 col-span-full">{formatForDisplay(student.joinedDate)?.date}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Status:</p>
              <p className="font-medium col-start-2 col-span-full">{student.status}</p>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
            <div className="grid grid-cols-3 px-6 py-3">
              <p className="">Notes:</p>
              <div className="font-medium col-start-2 col-span-full break-words whitespace-pre-wrap">{student.notes}</div>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
          </div>



      </div>
      
    </div>
  );
}
