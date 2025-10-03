import Absensi from "@/components/Absensi";
import Sidebar from "@/components/Sidebar";
import StudentListHome from "@/components/StudentListHome";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <div className="mr-72"></div>

      <div className="flex flex-col gap-10">
        <StudentListHome/>
        <Absensi/>
      </div>
    </div>
  );
}
