"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function SuccessCard() {


  
  return (
    <div className="max-w-lg bg-white rounded-xl mx-auto font-poppins">
        <div className="flex flex-col text-center py-20 px-24 min-w-full space-y-12">
            <Check className="w-24 h-24 p-2 text-white bg-primary rounded-full mx-auto"/>

            <div className="flex flex-col gap-5 whitespace-nowrap">
                <div className="text-2xl font-bold text-primary">Pendaftaran Berhasil!</div>
                <div className="text-sm">Murid baru sudah berhasil ditambahkan ke sistem.<br/>Silakan cek di halaman Semua Murid.</div>
            </div>

            <div>
                <button className="px-10 py-3 bg-primary border border-primary font-bold text-sm text-white rounded-lg cursor-pointer hover:bg-transparent hover:text-primary">Oke</button>
            </div>
        </div>
    </div>
  )
}
