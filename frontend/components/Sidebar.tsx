"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-gray-900 text-gray-100 flex flex-col ">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        EasyStudy E-System
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {/* Home */}
        <Link
          href="/"
          className={`block rounded-md px-3 py-2 transition-colors ${
            pathname === "/" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          Home
        </Link>

        {/* Students with subsections */}
        <div>
          <div className="px-3 py-2 text-gray-400 font-medium">Students</div>
          <div className="ml-4 flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)] pl-3">
            <Link
              href="/students"
              className={`block rounded-md px-3 py-2 ${
                pathname === "/students" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              All
            </Link>
            <Link
              href="/add"
              className={`block rounded-md px-3 py-2 ${
                pathname === "/students/add" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Add Student
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        Version 0.4
      </div>
    </aside>
  )
}
