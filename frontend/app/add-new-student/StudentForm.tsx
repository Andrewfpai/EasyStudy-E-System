"use client";
import { useState, useRef, memo  } from "react";
import { addStudent } from "../../lib/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { formatDateToUTC } from "@/utils/date";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarArrowDown } from "lucide-react";
import SuccessCard from "./SuccessCard";

const MemoizedSelect = memo(Select);
const MemoizedCalendar = memo(Calendar);

export default function StudentForm({ onStudentAdded }: { onStudentAdded: () => void }) {

  // ----- Input states -----
  const nameRef = useRef<HTMLInputElement>(null);
  const hanziNameRef = useRef<HTMLInputElement>(null);
  const pinyinNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const parentNameRef = useRef<HTMLInputElement>(null);
  const parentPhoneRef = useRef<HTMLInputElement>(null);
  const customEducationRef = useRef<HTMLInputElement>(null);
  const schoolOrCompanyRef = useRef<HTMLInputElement>(null);
  const customMandarinGoalRef = useRef<HTMLInputElement>(null);
  const customHeardFromRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  
  // ----- Minimal reactive states -----
  const [joinedDate, setJoinedDate] = useState<Date | undefined>(undefined);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [tokenRemaining, setTokenRemaining] = useState(16);
  const [lessonPrice, setLessonPrice] = useState("Rp2.200.000");
  const [status, setStatus] = useState<"Aktif" | "Nonaktif" | "Keluar">("Aktif");
  const [tipeHarga, setTipeHarga] = useState<"Lama" | "Baru">("Lama");
  const [startLevel, setStartLevel] = useState("Basic");
  const [gender, setGender] = useState("Laki-laki");
  const [education, setEducation] = useState("");
  const [mandarinGoal, setMandarinGoal] = useState("");
  const [heardFrom, setHeardFrom] = useState("");

  const [openJoined, setOpenJoined] = useState(false);
  const [openBirth, setOpenBirth] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const studentData = {
        name: nameRef.current?.value ?? "",
        hanziName: hanziNameRef.current?.value ?? "",
        pinyinName: pinyinNameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        address: addressRef.current?.value ?? "",
        phoneNumber: phoneNumberRef.current?.value ?? "",
        tokenUsed: 0,
        tokenRemaining,
        joinedDate: joinedDate ? formatDateToUTC(joinedDate) : new Date().toISOString(),
        birthDate: birthDate ? formatDateToUTC(birthDate) : new Date().toISOString(),
        startLevel,
        gender,
        parentName: parentNameRef.current?.value ?? "",
        parentPhone: parentPhoneRef.current?.value ?? "",
        education: education === "Lainnya" ? customEducationRef.current?.value ?? "" : education,
        schoolOrCompany: schoolOrCompanyRef.current?.value ?? "",
        mandarinGoal: mandarinGoal === "Lainnya" ? customMandarinGoalRef.current?.value ?? "" : mandarinGoal,
        heardFrom: heardFrom === "Lainnya" ? customHeardFromRef.current?.value ?? "" : heardFrom,
        lessonPrice,
        status,
        tipeHarga,
        notes: notesRef.current?.value ?? "",
      };
      await addStudent(studentData);
      setShowSuccess(true);

      // Reset all fields
      setJoinedDate(undefined);
      setBirthDate(undefined);
      setTokenRemaining(16);
      setLessonPrice("Rp2.200.000");
      setStatus("Aktif");
      setTipeHarga("Lama");
      setStartLevel("Basic");
      setGender("Laki-laki");
      setEducation("");
      setMandarinGoal("");
      setHeardFrom("");


      // Reset text inputs manually
      [
        nameRef, hanziNameRef, pinyinNameRef, emailRef, addressRef, phoneNumberRef,
        parentNameRef, parentPhoneRef, customEducationRef, schoolOrCompanyRef,
        customMandarinGoalRef, customHeardFromRef, notesRef
      ].forEach(ref => { if (ref.current) ref.current.value = ""; });

      onStudentAdded?.();
    } catch (error) {
      console.error(error);
      alert("Failed to add student.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-5 overflow-auto max-w-lg w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
      >
        <div className="font-extrabold text-2xl pb-2">Tambah Murid</div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Email</label>
          <input type="email" ref={emailRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" required />
        </div>

        {/* Joined Date */}
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
          {/* Token */}
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Token</label>
            <MemoizedSelect
              value={tokenRemaining.toString()}
              onValueChange={value => setTokenRemaining(+value)}
            >
              <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {[16, 8].map(n => (
                  <SelectItem key={n} value={n.toString()} className="text-base !py-3">
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </MemoizedSelect>
          </div>

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
        

        {/* Start Level Mandarin */}
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

        {/* Nama Indonesia */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nama Indonesia</label>
          <input
            type="text"
            ref={nameRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        {/* Nama Mandarin */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nama Mandarin</label>
          <input
            type="text"
            ref={hanziNameRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        
        {/* Gender */}
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
        

        {/* Alamat */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Alamat Tempat Tinggal</label>
          <input
            type="text"
            ref={addressRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Birth Date */}
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

        {/* Nomor HP Whatsapp */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nomor HP Whatsapp</label>
          <input
            type="tel"
            ref={phoneNumberRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Parent Info */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nama Orangtua/Wali Murid</label>
          <input
            type="text"
            ref={parentNameRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Nomor HP Orangtua</label>
          <input
            type="tel"
            ref={parentPhoneRef}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        {/* Education */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Pendidikan</label>
          <MemoizedSelect value={education} onValueChange={setEducation}>
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
              <SelectValue placeholder="Pilih Pendidikan"/>
            </SelectTrigger>
            <SelectContent>
              {["SD","SMP","SMA","Kuliah","Lainnya"].map(ed => <SelectItem key={ed} value={ed}>{ed}</SelectItem>)}
            </SelectContent>
          </MemoizedSelect>
          {education === "Lainnya" && <input ref={customEducationRef} placeholder="Tulis pendidikan Anda" className="mt-2 px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"/>}
        </div>
    
          {/* School or Company */}
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Nama Sekolah atau Perusahaan</label>
            <input
              type="text"
              ref={schoolOrCompanyRef}
              className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
        </div>

        {/* Mandarin Goal */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Tujuan Les Mandarin</label>
          <MemoizedSelect value={mandarinGoal} onValueChange={setMandarinGoal}>
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
              <SelectValue placeholder="Pilih Tujuan"/>
            </SelectTrigger>
            <SelectContent>
              {["Percakapan","HSK","Pekerjaan","Wisata","Lainnya"].map(goal => <SelectItem key={goal} value={goal}>{goal}</SelectItem>)}
            </SelectContent>
          </MemoizedSelect>
          {mandarinGoal === "Lainnya" && <input ref={customMandarinGoalRef} placeholder="Tulis tujuan Anda" className="mt-2 px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"/>}
        </div>

        {/* Heard From */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Mengetahui kursus Easy Study dari</label>
          <MemoizedSelect value={heardFrom} onValueChange={setHeardFrom}>
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition data-[placeholder]:text-E-gray text-base !h-auto">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {["Google","Rekomendasi Teman","Instagram/Facebook","Acara Seminar","Anggota keluarga","Lainnya"].map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
            </SelectContent>
          </MemoizedSelect>
          {heardFrom === "Lainnya" && <input ref={customHeardFromRef} placeholder="Tulis sumber Anda" className="mt-2 px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"/>}
        </div>


        {/* Notes */}
        {/* Notes */}
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Notes</label>
          <textarea ref={notesRef} placeholder="Tulis catatan disini ..." className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition h-28 resize-y placeholder:text-E-gray"/>
        </div>

        <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-transparent hover:border hover:border-primary hover:text-primary cursor-pointer transition">
          Add Student
        </button>
      </form>


      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition transition-opacity duration-300">
          <SuccessCard />
          <button
            onClick={() => setShowSuccess(false)}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label="Close modal"
          />
        </div>
      )}
      </div>
  );
}
