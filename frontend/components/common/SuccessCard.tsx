"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function SuccessCard(params:any) {

  const header = params.header
  const body = params.body
  const onClose = params.onClose
  
  return (
    <div className="max-w-lg bg-white rounded-xl mx-auto font-poppins">
        <div className="flex flex-col text-center py-20 px-6 sm:px-12 space-y-12 min-w-full space-y-12">
            <Check className="w-24 h-24 p-2 text-white bg-primary rounded-full mx-auto"/>

            <div className="flex flex-col gap-5">
                <div className="text-2xl font-bold text-primary">{header}</div>
                <div className="text-sm whitespace-pre-line">{body}</div>
            </div>

            <div>
                <button onClick={onClose} className="px-10 py-3 bg-primary border border-primary font-bold text-sm text-white rounded-lg cursor-pointer hover:bg-transparent hover:text-primary">Oke</button>
            </div>
        </div>
    </div>
  )
}
