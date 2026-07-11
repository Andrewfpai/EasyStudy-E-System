import Link from "next/link"
import { StatusAvatar } from "./StatusAvatar"
import { Student } from "@/types/student"

export default function StudentCard({ student }: { student: Student }) {
    return (
        <div className="flex flex-col items-center bg-background text-center rounded-2xl min-w-[175px] min-h-[300px] lg:min-h-[275px] p-6">
            <StatusAvatar status={student.status} />
            <div className="mt-4 font-bold text-sm xl:text-base">{student.name}</div>
            <div className="mt-2 text-sm xl:text-base">Sisa Token: {student.tokenRemaining}</div>
            <div className="flex-1"></div>
            <Link target="_blank" href={`https://wa.me/${student.phoneNumber}`} className="py-3 min-w-full bg-E-gray-b rounded-lg text-xs xl:text-base font-semibold cursor-pointer border hover:border-E-gray-b hover:bg-transparent">
            <button>Hubungi Murid</button>
            </Link>
        </div>
    
    )
}