"use client"

import { useRef, useState, memo } from "react"
import { updateStudentData } from "@/lib/api"
import { Student } from "@/app/types/student"
import { formatDateToUTC } from "@/utils/date"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarArrowDown } from "lucide-react"
import SuccessCard from "@/app/add-new-student/SuccessCard"

interface InfoProps {
  student: Student
  onSaved?: () => void

  
}

const MemoizedSelect = memo(Select);
const MemoizedCalendar = memo(Calendar);

export default function Info({ student, onSaved }: InfoProps) {
  // refs
  const nameRef = useRef<HTMLInputElement>(null)
  const hanziNameRef = useRef<HTMLInputElement>(null)
  const pinyinNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const parentNameRef = useRef<HTMLInputElement>(null)
  const parentPhoneRef = useRef<HTMLInputElement>(null)
  const schoolRef = useRef<HTMLInputElement>(null)
  const notesRef = useRef<HTMLTextAreaElement>(null)
  const customMandarinGoalRef = useRef<HTMLInputElement>(null);
  const customHeardFromRef = useRef<HTMLInputElement>(null);
  const customEducationRef = useRef<HTMLInputElement>(null);

  // states
  const [joinedDate, setJoinedDate] = useState<Date | undefined>(
    student.joinedDate ? new Date(student.joinedDate) : undefined
  )
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    student.birthDate ? new Date(student.birthDate) : undefined
  )
  const [tokenRemaining, setTokenRemaining] = useState(student.tokenRemaining)
  const [lessonPrice, setLessonPrice] = useState(student.lessonPrice)
  const [tipeHarga, setTipeHarga] = useState(student.tipeHarga)
  const [startLevel, setStartLevel] = useState(student.startLevel)
  const [gender, setGender] = useState(student.gender)
  const [status, setStatus] = useState(student.status)
  const [education, setEducation] = useState(student.education)
  const [mandarinGoal, setMandarinGoal] = useState(student.mandarinGoal)
  const [heardFrom, setHeardFrom] = useState(student.heardFrom)

  const [openJoined, setOpenJoined] = useState(false)
  const [openBirth, setOpenBirth] = useState(false)
  const [loading, setLoading] = useState(false)

  const normalizedEducation = education && education.trim() !== "" ? education : "Lainnya"
  const isPredefinedEducation = ["SD", "SMP", "SMA", "Kuliah"].includes(normalizedEducation)
  
  const normalizedMandarinGoal = mandarinGoal && mandarinGoal.trim() !== "" ? mandarinGoal : "Lainnya"
  const isPredefinedMandarinGoal = ["Percakapan","HSK","Pekerjaan","Wisata","Lainnya"].includes(normalizedMandarinGoal)

  
  const normalizedHeardFrom = heardFrom && heardFrom.trim() !== "" ? heardFrom : "Lainnya"
  const isPredefinedHeardFrom = ["Google","Rekomendasi Teman","Instagram/Facebook","Acara Seminar","Anggota keluarga","Lainnya"].includes(normalizedHeardFrom)


  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateStudentData(student.id, {
        name: nameRef.current?.value ?? "",
        hanziName: hanziNameRef.current?.value ?? "",
        pinyinName: pinyinNameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        address: addressRef.current?.value ?? "",
        phoneNumber: phoneRef.current?.value ?? "",
        parentName: parentNameRef.current?.value ?? "",
        parentPhone: parentPhoneRef.current?.value ?? "",
        schoolOrCompany: schoolRef.current?.value ?? "",
        notes: notesRef.current?.value ?? "",
        tokenRemaining,
        lessonPrice,
        tipeHarga,
        startLevel,
        gender,
        status,
        education: education === "Lainnya" ? customEducationRef.current?.value ?? "" : education,
        mandarinGoal: mandarinGoal === "Lainnya" ? customMandarinGoalRef.current?.value ?? "" : mandarinGoal,
        heardFrom: heardFrom === "Lainnya" ? customHeardFromRef.current?.value ?? "" : heardFrom,
        joinedDate: joinedDate ? formatDateToUTC(joinedDate) : "",
        birthDate: birthDate ? formatDateToUTC(birthDate) : "",
      })

      setShowSuccess(true);
      onSaved?.()
    } catch (err) {
      console.error(err)
      alert("Gagal menyimpan perubahan")
    } finally {
      setLoading(false)
   
    }
  }

  console.log(student)

  return (
    <form
      onSubmit={handleSave}
      className="mt-5 max-w-lg w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <div className="font-extrabold text-2xl">Edit Murid</div>

      <div className="space-y-4">

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Email</label>
          <input ref={emailRef} defaultValue={student.email} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Tanggal Masuk Les</label>
          <Popover open={openJoined} onOpenChange={setOpenJoined}>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer">
                <input
                  readOnly
                  value={joinedDate ? joinedDate.toLocaleDateString() : "Pilih Tanggal"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <CalendarArrowDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0">
              <MemoizedCalendar
                mode="single"
                selected={joinedDate}
                captionLayout="dropdown"
                onSelect={date => {
                  setJoinedDate(date || undefined);
                  setOpenJoined(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-3 space-x-4">

          {/* Harga Les */}
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Harga Les</label>
            <MemoizedSelect
              value={lessonPrice}
              onValueChange={setLessonPrice}
            >
              <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
                <SelectValue placeholder="Select price" />
              </SelectTrigger>
              <SelectContent>
                {["Rp2.200.000", "Rp3.600.000"].map(price => (
                  <SelectItem key={price} value={price}>
                    {price}
                  </SelectItem>
                ))}
              </SelectContent>
            </MemoizedSelect>
          </div>

          {/* Tipe Harga */}
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Tipe Harga</label>
            <MemoizedSelect
              value={tipeHarga}
              onValueChange={value => setTipeHarga(value as "Lama" | "Baru")}
            >
              <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
                <SelectValue placeholder="Select tipe harga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lama">Lama</SelectItem>
                <SelectItem value="Baru">Baru</SelectItem>
              </SelectContent>
            </MemoizedSelect>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Start Level Mandarin</label>
          <MemoizedSelect
            value={startLevel}
            onValueChange={setStartLevel}
          >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {["Basic", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map(level => (
                <SelectItem key={level} value={level} className="!py-3">{level}</SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nama Indonesia</label>
          <input ref={nameRef} defaultValue={student.name} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nama Mandarin</label>
          <input ref={hanziNameRef} defaultValue={student.hanziName? student.hanziName : ""} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Jenis Kelamin</label>
          <MemoizedSelect
            value={gender}
            onValueChange={setGender}
          >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {["Laki-laki", "Perempuan"].map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Alamat</label>
          <input ref={addressRef} defaultValue={student.address} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

         <div className="flex flex-col">
            <label className="mb-2 font-bold">Tanggal Lahir</label>
            <Popover open={openBirth} onOpenChange={setOpenBirth}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <input
                    value={birthDate ? birthDate.toLocaleDateString() : "Pilih Tanggal"}
                    readOnly
                    className={`${birthDate ? "" : "text-E-gray"} 
                              text-left w-full px-4 py-2 border border-E-gray-b 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                              focus:border-primary transition cursor-pointer`}
                  />
                  <CalendarArrowDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </PopoverTrigger>
  
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <MemoizedCalendar
                  mode="single"
                  selected={birthDate}
                  captionLayout="dropdown"
                  onSelect={(selected) => {
                    if (selected) {
                      setBirthDate(selected);
                      setOpenBirth(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">No. Telepon Murid</label>
          <input ref={phoneRef} defaultValue={student.phoneNumber} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nama Orang Tua</label>
          <input ref={parentNameRef} defaultValue={student.parentName} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">No. Telepon Orang Tua</label>
          <input ref={parentPhoneRef} defaultValue={student.parentPhone} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Pendidikan</label>

          <MemoizedSelect
            value={isPredefinedEducation ? normalizedEducation : "Lainnya"}
            onValueChange={setEducation}
          >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
              <SelectValue placeholder="Pilih Pendidikan" />
            </SelectTrigger>
            <SelectContent>
              {["SD", "SMP", "SMA", "Kuliah", "Lainnya"].map(ed => (
                <SelectItem key={ed} value={ed}>
                  {ed}
                </SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>

          {(!isPredefinedEducation || normalizedEducation === "Lainnya") && (
            <input
              ref={customEducationRef}
              defaultValue={
                !isPredefinedEducation && education ? education : ""
              }
              placeholder="Tulis pendidikan Anda"
              className="mt-2 px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          )}
        </div>



        <div className="flex flex-col">
          <label className="mb-2 font-bold">Sekolah / Perusahaan</label>
          <input ref={schoolRef} defaultValue={student.schoolOrCompany} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
        </div>

       

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Tujuan Les Mandarin</label>

          <MemoizedSelect
            value={isPredefinedMandarinGoal ? normalizedMandarinGoal : "Lainnya"}
            onValueChange={setMandarinGoal}
          >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
              <SelectValue placeholder="Pilih Pendidikan" />
            </SelectTrigger>
            <SelectContent>
              {["Percakapan","HSK","Pekerjaan","Wisata","Lainnya"].map(ed => (
                <SelectItem key={ed} value={ed}>
                  {ed}
                </SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>

          {(!isPredefinedMandarinGoal || normalizedMandarinGoal === "Lainnya") && (
            <input
              ref={customMandarinGoalRef}
              defaultValue={
                !isPredefinedMandarinGoal && mandarinGoal ? mandarinGoal : ""
              }
              placeholder="Tulis pendidikan Anda"
              className="mt-2 px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          )}
        </div>

       <div className="flex flex-col">
          <label className="mb-2 font-bold">Tujuan Les Mandarin</label>

          <MemoizedSelect
            value={isPredefinedHeardFrom ? normalizedHeardFrom : "Lainnya"}
            onValueChange={setHeardFrom}
          >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
              <SelectValue placeholder="Tulis Tujuan Anda" />
            </SelectTrigger>
            <SelectContent>
              {["Google","Rekomendasi Teman","Instagram/Facebook","Acara Seminar","Anggota keluarga","Lainnya"].map(ed => (
                <SelectItem key={ed} value={ed}>
                  {ed}
                </SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>

          {(!isPredefinedHeardFrom || normalizedHeardFrom === "Lainnya") && (
            <input
              ref={customHeardFromRef}
              defaultValue={
                !isPredefinedHeardFrom && heardFrom ? heardFrom : ""
              }
              placeholder="Tulis sumber Anda"
              className="mt-2 px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Status Murid</label>
          <MemoizedSelect
            value={status}
            onValueChange={(value) => setStatus(value as "Aktif" | "Nonaktif" | "Keluar")}
          >
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {["Aktif", "Nonaktif","Keluar"].map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>
        </div>


        <div className="flex flex-col">
          <label className="mb-2 font-bold">Catatan</label>
          <textarea
            ref={notesRef}
            defaultValue={student.notes? student.notes:""}
            placeholder="Tulis catatan disini ..."
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition h-28 resize-y placeholder:text-E-gray"
          />
        </div>

        


      </div>


      

      


      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg"
      >
        Save Changes
      </button>

      {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition transition-opacity duration-300">
          <SuccessCard
              header="Data Berhasil Diperbarui!"
              body={`Data sudah berhasil diperbarui.\nSilakan cek di halaman Data Diri.`}
              onClose={() => setShowSuccess(false)}
              />
          {/* <button
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Close modal"
          /> */}
          </div>
      )}
    </form>
  )
}
