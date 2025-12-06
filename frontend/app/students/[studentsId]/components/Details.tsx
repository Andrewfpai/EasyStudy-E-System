"use client"
import { useState } from "react";

import { Student } from "@/app/types/student";
import { formatForDisplay } from "@/utils/date";
import { addTokensWithPayment } from "@/lib/api";

interface DetailsProps {
  studentsInput: Student;
}

export default function Details({ studentsInput }:DetailsProps) {
  const [student, setStudent] = useState<Student>(studentsInput);

  const [paymentUrl, setPaymentUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [tokenInput, setTokenInput] = useState<number | null>(null);
 
  console.log("student: ",student)

  const handleAddTokensWithPayment = async () => {
  if (!tokenInput || loading) return;

  setLoading(true);
  try {
    const updated = await addTokensWithPayment(student.id, tokenInput, paymentUrl);
    setStudent(updated);
    setTokenInput(null);
    setPaymentUrl("");
    alert("Tokens and payment recorded successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to add tokens/payment.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col w-full text-E-Black">
      
      

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
              <div className="font-medium col-start-2 col-span-full break-words whitespace-pre-wrap">{student?.notes}</div>
            </div>
            {/* <div className="border-t border-dotted border-gray-400 my-3 col-span-2"></div> */}
            
          </div>

          <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={tokenInput ?? ""}
          onChange={e => setTokenInput(e.target.value ? parseInt(e.target.value) : null)}
          placeholder="Token amount"
          className="border px-2 py-1 rounded w-32"
        />
        <input
          type="text"
          value={paymentUrl}
          onChange={e => setPaymentUrl(e.target.value)}
          placeholder="Payment image URL"
          className="border px-2 py-1 rounded w-64"
        />
        <button
          className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50"
          onClick={handleAddTokensWithPayment}
          disabled={loading}
        >
          Add Token & Payment
        </button>
      </div>

      </div>
      
    </div>
  );
}
