"use client";
import { useState } from "react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentForm({ onStudentAdded }: { onStudentAdded: () => void }) {
  const [openJoined, setOpenJoined] = useState(false);
  const [openBirth, setOpenBirth] = useState(false);
  const [joinedDateCalendar, setJoinedDateCalendar] = useState<Date | undefined>(undefined);
  const [birthDateCalendar, setBirthDateCalendar] = useState<Date | undefined>(undefined);
  const [customMandarinGoal, setCustomMandarinGoal] = useState("");
  const [customHeardFrom, setCustomHeardFrom] = useState("");
  const [customEducation, setCustomEducation] = useState("");



  const [form, setForm] = useState({
    name: "",
    hanziName: "",
    pinyinName: null,
    email: "",
    address: "",
    phoneNumber: "",
    tokenUsed: 0,
    tokenRemaining: 16,
    joinedDate: new Date().toISOString(),
    birthDate: new Date().toISOString(),
    startLevel: "Basic",
    gender: "laki-laki",
    parentName: "",
    parentPhone: "",
    education: "",
    schoolOrCompany: "",
    mandarinGoal: "",
    heardFrom:"",
    lessonPrice:"",
    status: "ACTIVE" as 'ACTIVE' | 'OUT' | 'TEMP_INACTIVE',
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Merge custom values if "Lainnya" is selected
    const studentData = {
      ...form,
      mandarinGoal: form.mandarinGoal === "Lainnya" ? customMandarinGoal : form.mandarinGoal,
      heardFrom: form.heardFrom === "Lainnya" ? customHeardFrom : form.heardFrom,
    };

    await addStudent(studentData);
    alert("Student added successfully!");

    // Reset form + custom inputs
    setForm({
      name: "",
      hanziName: "",
      pinyinName: null,
      email: "",
      address: "",
      phoneNumber: "",
      tokenUsed: 0,
      tokenRemaining: 16,
      joinedDate: new Date().toISOString(),
      birthDate: new Date().toISOString(),
      startLevel: "Basic",
      gender: "laki-laki",
      parentName: "",
      parentPhone: "",
      education: "",
      schoolOrCompany: "",
      mandarinGoal: "",
      heardFrom: "",
      lessonPrice: "",
      status: "ACTIVE",
      notes: "",
    });

    setCustomMandarinGoal("");
    setCustomHeardFrom("");

    onStudentAdded?.();
  } catch (error) {
    console.error(error);
    alert("Failed to add student.");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 overflow-auto max-w-lg w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 text-E-black"
    >

      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      {/* Joined Date */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Tanggal Masuk Les</label>
        <Popover open={openJoined} onOpenChange={setOpenJoined}>
          <PopoverTrigger asChild>
            <input
              value={joinedDateCalendar ? joinedDateCalendar.toISOString().split("T")[0] : ""}
              readOnly
              className="text-left px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={joinedDateCalendar}
              captionLayout="dropdown"
              onSelect={(selected) => {
                if (selected) {
                  setJoinedDateCalendar(selected);
                  setForm({ ...form, joinedDate: formatDateToUTC(selected) });
                  setOpenJoined(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Token */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Token</label>
        <Select
          value={form.tokenRemaining.toString()}
          onValueChange={value => setForm({ ...form, tokenRemaining: +value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {[16, 8].map(n => (
              <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Harga Les */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Harga Les</label>
        <Select
          value={form.lessonPrice || ""}
          onValueChange={value => setForm({ ...form, lessonPrice: value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select price" />
          </SelectTrigger>
          <SelectContent>
            {["Rp3.600.000", "Rp2.200.000"].map(price => (
              <SelectItem key={price} value={price}>{price}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {/* Start Level Mandarin */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Start Level Mandarin</label>
        <Select
          value={form.startLevel}
          onValueChange={value => setForm({ ...form, startLevel: value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {["Basic", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Nama Indonesia */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Nama Indonesia</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      {/* Nama Mandarin */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Nama Mandarin</label>
        <input
          type="text"
          value={form.hanziName}
          onChange={e => setForm({ ...form, hanziName: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      
      {/* Gender */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Jenis Kelamin</label>
        <Select
          value={form.gender}
          onValueChange={value => setForm({ ...form, gender: value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {["laki-laki", "perempuan"].map(g => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      

      {/* Alamat */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Alamat Tempat Tinggal</label>
        <input
          type="text"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
        />
      </div>

      {/* Birth Date */}
      <div className="flex flex-col">
        <label className=" mb-2 text-gray-700 font-semibold">Tanggal Lahir</label>
        <Popover open={openBirth} onOpenChange={setOpenBirth}>
          <PopoverTrigger asChild>
            <input
              value={birthDateCalendar ? birthDateCalendar.toISOString().split("T")[0] : ""}
              readOnly
              className="text-left px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={birthDateCalendar}
              captionLayout="dropdown"
              onSelect={(selected) => {
                if (selected) {
                  setBirthDateCalendar(selected);
                  setForm({ ...form, birthDate: formatDateToUTC(selected) });
                  setOpenBirth(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Nomor HP Whatsapp */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Nomor HP Whatsapp</label>
        <input
          type="tel"
          value={form.phoneNumber}
          onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
        />
      </div>

       {/* Parent Info */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Nama Orangtua/Wali Murid</label>
        <input
          type="text"
          value={form.parentName}
          onChange={e => setForm({ ...form, parentName: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Nomor HP Orangtua</label>
        <input
          type="tel"
          value={form.parentPhone}
          onChange={e => setForm({ ...form, parentPhone: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Education */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Pendidikan</label>
        <Select
          value={form.education}
          onValueChange={value => setForm({ ...form, education: value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select education" />
          </SelectTrigger>
          <SelectContent>
            {["SD", "SMP", "SMA", "Kuliah", "Lainnya"].map(ed => (
              <SelectItem key={ed} value={ed}>{ed}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.education === "Lainnya" && (
          <input
            type="text"
            placeholder="Tulis tujuan Anda"
            value={customEducation}
            onChange={e => setCustomEducation(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        )}
      </div>

       {/* School or Company */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Nama Sekolah atau Perusahaan</label>
        <input
          type="text"
          value={form.schoolOrCompany}
          onChange={e => setForm({ ...form, schoolOrCompany: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Mandarin Goal */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Tujuan Les Mandarin</label>
        <Select
          value={form.mandarinGoal}
          onValueChange={value => setForm({ ...form, mandarinGoal: value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select goal" />
          </SelectTrigger>
          <SelectContent>
            {["Percakapan", "HSK", "Pekerjaan", "Wisata", "Lainnya"].map(goal => (
              <SelectItem key={goal} value={goal}>{goal}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.mandarinGoal === "Lainnya" && (
          <input
            type="text"
            placeholder="Tulis tujuan Anda"
            value={customMandarinGoal}
            onChange={e => setCustomMandarinGoal(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        )}

      </div>

      {/* Ads */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Mengetahui kursus Easy Study dari</label>
        <Select
          value={form.heardFrom}
          onValueChange={value => setForm({ ...form, heardFrom: value })}
        >
          <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Google",
              "Rekomendasi Teman",
              "Instagram/Facebook",
              "Acara Seminar",
              "Anggota keluarga yang sudah pernah les",
              "Lainnya"
            ].map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {form.heardFrom === "Lainnya" && (
          <input
            type="text"
            placeholder="Tulis tujuan Anda"
            value={customHeardFrom}
            onChange={e => setCustomHeardFrom(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        )}



      </div>

      



      

      

     

     

      {/* Notes */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Notes</label>
        <textarea
          value={form.notes || ""}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition h-28 resize-y"
          placeholder="Write notes here..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-transparent hover:border hover:border-primary hover:text-primary cursor-pointer transition"
      >
        Add Student
      </button>
    </form>
  );
}
