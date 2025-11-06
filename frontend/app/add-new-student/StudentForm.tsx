"use client";
import { useState } from "react";
import { addStudent } from "../../lib/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { formatDateToISO, formatDateToUTC } from "@/utils/date";

export default function StudentForm({ onStudentAdded }: { onStudentAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const [form, setForm] = useState({
    name: "",
    hanziName: "",
    pinyinName: null, // Added to satisfy the type (backend will override)
    email: "",
    address: "",
    phoneNumber: "", // Keep as string
    tokenUsed: 0, // Ensure this is present
    tokenRemaining: 16,
    joinedDate: new Date().toISOString(),
    status: "ACTIVE" as 'ACTIVE' | 'OUT' | 'TEMP_INACTIVE',
    notes: "", // Added
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Exclude joinedDate (backend handles it); pinyinName is null, tokenUsed is included
      const { joinedDate, ...studentData } = form;
      await addStudent(studentData);
      alert("Student added successfully!");
      setForm({
        name: "",
        hanziName: "",
        pinyinName: null, // Reset
        email: "",
        address: "",
        phoneNumber: "", // Reset to string
        tokenUsed: 0, // Reset
        tokenRemaining: 16,
        joinedDate: new Date().toISOString(),
        status: "ACTIVE",
        notes: "", // Reset
      });
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
      {/* Name */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      {/* Hanzi Name */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Hanzi Name</label>
        <input
          type="text"
          value={form.hanziName}
          onChange={e => setForm({ ...form, hanziName: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Address</label>
        <input
          type="text"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary transition"
        />
      </div>

      {/* Phone */}
        <div className="flex flex-col col-span-3">
          <label className="mb-2 text-gray-700 font-semibold">Phone Number</label>
          <input
            type="tel"
            value={form.phoneNumber}
            onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary transition"
          />
        </div>

      {/* Tokens Used & Remaining */}
      <div className="grid grid-cols-4 gap-4">
        {/* Joined Date */}
        <div className="flex flex-col col-span-3">
          <label className="mb-2 text-gray-700 font-semibold">Joined Date</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <input
                value={form?.joinedDate ? form?.joinedDate?.split('T')[0] : ""}
                id="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary transition text-left"
              />
                {/* {form.joinedDate || "Select date"} show placeholder if empty */}
                {/* <ChevronDownIcon /> */}
              
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                    setForm({
                      ...form,
                      joinedDate: formatDateToUTC(selectedDate), // keep as "YYYY-MM-DD"
                    });
                    setOpen(false);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-semibold">Tokens Used</label>
          <input
            type="number"
            value={form.tokenUsed}
            onChange={e => setForm({ ...form, tokenUsed: +e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div> */}
        <div className="flex flex-col col-span-1">
          <label className="mb-2 text-gray-700 font-semibold">Tokens</label>
          <input
            type="number"
            value={form.tokenRemaining}
            onChange={e => setForm({ ...form, tokenRemaining: +e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
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
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Add Student
      </button>
    </form>
  );
}
