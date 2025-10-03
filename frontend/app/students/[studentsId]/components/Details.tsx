"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { updateStudentData } from "@/lib/api";

export default function Details({ student: initialStudent }) {
  const [student, setStudent] = useState(initialStudent);
  const [editedFields, setEditedFields] = useState<Partial<typeof student>>({});
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (field: keyof typeof student, value: any) => {
    setStudent(prev => ({ ...prev, [field]: value }));
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!Object.keys(editedFields).length) return;

    const confirmSave = confirm("Save changes?");
    if (!confirmSave) return;

    console.log("edited Fields", editedFields)
    setLoading(true);
    try {
      const updated = await updateStudentData(student.id, editedFields);
      setStudent(updated);
      setEditedFields({});
      alert("Changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label: string, field: keyof typeof student) => (
    <p className="flex items-center gap-2">
      <strong>{label}:</strong>
      <input
        type="text"
        value={student[field] ?? ""}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="border px-2 py-1 rounded w-64"
      />
      {editedFields[field] !== undefined && <span className="text-red-500">●</span>}
    </p>
  );

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="mr-72"></div>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Student Details</h1>
        <div className="space-y-4">
          {renderField("Name", "name")}
          {renderField("Hanzi Name", "hanziName")}
          {renderField("Pinyin Name", "pinyinName")}
          {renderField("Email", "email")}
          {renderField("Address", "address")}
          {renderField("Phone", "phoneNumber")}
          {renderField("Token Used", "tokenUsed")}
          {renderField("Token Remaining", "tokenRemaining")}
          {renderField("Status", "status")}
          {renderField("Notes", "notes")}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSave}
            disabled={loading || !Object.keys(editedFields).length}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
