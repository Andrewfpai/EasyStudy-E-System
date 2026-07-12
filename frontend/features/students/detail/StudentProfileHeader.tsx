"use client";
import { useState } from "react";
import Link from "next/link";
import { Phone, SquarePen } from "lucide-react";
import { Student } from "@/types/student";
import { ProfilePictureUpload } from "./ProfilePictureUpload";

interface StudentProfileHeaderProps {
  student: Student;
}

export function StudentProfileHeader({ student: initialStudent }: StudentProfileHeaderProps) {
  const [student, setStudent] = useState(initialStudent);

  return (
    <div className="flex flex-col">
      <ProfilePictureUpload
        studentId={student.id}
        currentUrl={student.profilePictureUrl ?? null}
        status={student.status}
        onUploaded={(url) => setStudent((prev) => ({ ...prev, profilePictureUrl: url }))}
      />

      <div className="flex flex-row mt-5">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-extrabold">{student.name}</div>
          <div className="text-xl font-medium text-E-gray">{student.email}</div>
        </div>

        <div className="flex flex-row items-center ml-5 gap-3">
          <button className="flex flex-row gap-2 items-center bg-[#F0FEEC] text-primary px-6 py-2 rounded-lg text-sm cursor-pointer border border-primary hover:bg-transparent">
            <SquarePen className="w-5 h-5" />
            <Link href={`/students/${student.id}/edit`}>Edit</Link>
          </button>
          <button className="flex flex-row gap-2 items-center px-6 py-2 rounded-lg text-sm cursor-pointer border border-E-gray-b hover:bg-transparent">
            <Phone className="w-5 h-5" />
            <Link target="_blank" href={`https://wa.me/${student.phoneNumber}`}>Hubungi Murid</Link>
          </button>
        </div>
      </div>
    </div>
  );
}