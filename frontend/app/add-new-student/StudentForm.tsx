"use client";
import { useState } from "react";
import { addStudent } from "../../lib/api";

export default function StudentForm({ onStudentAdded }: { onStudentAdded: () => void }) {
  const [form, setForm] = useState({
    name: "",
    hanziName: "",
    email: "",
    address: "",
    phoneNumber: "",
    tokenUsed: 0,
    tokenRemaining: 16,
    status: "ACTIVE" as 'ACTIVE' | 'OUT' | 'TEMP_INACTIVE',
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStudent({ ...form });
      alert("Student added successfully!");
      setForm({
        name: "",
        hanziName: "",
        email: "",
        address: "",
        phoneNumber: "",
        tokenUsed: 0,
        tokenRemaining: 16,
        notes: "",
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
      className="max-w-lg w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      {/* Name */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Phone Number</label>
        <input
          type="tel"
          value={form.phoneNumber}
          onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Tokens Used & Remaining */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-semibold">Tokens Used</label>
          <input
            type="number"
            value={form.tokenUsed}
            onChange={e => setForm({ ...form, tokenUsed: +e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-semibold">Tokens Remaining</label>
          <input
            type="number"
            value={form.tokenRemaining}
            onChange={e => setForm({ ...form, tokenRemaining: +e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Notes</label>
        <textarea
          value={form.notes || ""}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-28 resize-y"
          placeholder="Write notes here..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Add Student
      </button>
    </form>
  );
}
