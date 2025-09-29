"use client";
import { useState } from "react";
import { addStudent } from "../../lib/api";

export default function StudentForm({ onStudentAdded }: { onStudentAdded: () => void }) {
  const [form, setForm] = useState({
    name: "",
    hanziName: "",
    email: "",
    address: "",
    phoneNumber: "", // store as string
    tokenUsed: 0,
    tokenRemaining: 16,
    status: "ACTIVE" as 'ACTIVE' | 'OUT' | 'TEMP_INACTIVE',

  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addStudent({
        ...form,
     
      });
      alert("Student added successfully!");

      setForm({
        name: "",
        hanziName:"",
        email: "",
        address: "",
        phoneNumber: "",
        tokenUsed: 0,
        tokenRemaining: 16,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add student.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-6 bg-gray-100 rounded shadow"
    >
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Hanzi Name</label>
        <input
          type="text"
          value={form.hanziName}
          onChange={e => setForm({ ...form, hanziName: e.target.value })}
          className="px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="px-3 py-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          value={form.phoneNumber}
          onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
          className="px-3 py-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Tokens Used</label>
        <input
          type="number"
          value={form.tokenUsed}
          onChange={e => setForm({ ...form, tokenUsed: +e.target.value })}
          className="px-3 py-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Tokens Remaining</label>
        <input
          type="number"
          value={form.tokenRemaining}
          onChange={e => setForm({ ...form, tokenRemaining: +e.target.value })}
          className="px-3 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Student
      </button>
    </form>
  );
}
