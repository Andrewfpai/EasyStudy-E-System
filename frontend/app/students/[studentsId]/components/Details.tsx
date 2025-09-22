"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { updateStudentTokens } from "@/lib/api";

export default function Details({ student: initialStudent }) {
  const [student, setStudent] = useState(initialStudent);
  const [loading, setLoading] = useState(false);

  async function handleUpdateTokens(change: number) {
    if (loading) return; // prevent double clicks
    setLoading(true);
    try {
      const updated = await updateStudentTokens(student.id, change);
      // Update local state
      setStudent((prev) => prev ? { ...prev, tokenUsed: updated.tokenUsed, tokenRemaining: updated.tokenRemaining } : prev);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="mr-72"></div>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Student Details</h1>
        <div className="space-y-4">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>Phone:</strong> {student.phoneNumber}</p>
          <p><strong>Joined:</strong> {(student.joinedDate)}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Token Used:</strong> {student.tokenUsed}</p>
          <p><strong>Token Remaining:</strong> {student.tokenRemaining}</p>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleUpdateTokens(1)}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            + Add Token
          </button>
          <button
            onClick={() => handleUpdateTokens(-1)}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            - Subtract Token
          </button>
        </div>
      </div>
    </div>
  );
}
