"use client"
import { useState } from "react";
import { updateStudentData, addTokensWithPayment } from "@/lib/api";
import { formatDate } from "@/utils/date";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Info({ student: initialStudent }) {
  const [student, setStudent] = useState(initialStudent);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [editedFields, setEditedFields] = useState<Partial<typeof student>>({});
  const [loading, setLoading] = useState(false);
  const [tokenInput, setTokenInput] = useState<number | null>(null);

  const STATUS = [
    {
      "value":"ACTIVE",
      "display":"Active"
    },
    {
      "value":"TEMP_INACTIVE",
      "display":"Temp_inactive"
    },
    {
      "value":"OUT",
      "display":"out"
    },
  ]
  console.log("student: ",student)

  const handleFieldChange = (field: keyof typeof student, value: any) => {
    setStudent(prev => ({ ...prev, [field]: value }));
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!Object.keys(editedFields).length) return;

    const confirmSave = confirm("Save changes?");
    if (!confirmSave) return;

    // console.log("edited Fields", editedFields)
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

  const handleAddTokensWithPayment = async () => {
  if (!tokenInput || loading) return;

  setLoading(true);
  try {
    const updated = await addTokensWithPayment(student.id, tokenInput, paymentUrl);
    setStudent(updated);
    setTokenInput(null);
    setPaymentUrl("");
    alert("Tokens and payment recorded successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to add tokens/payment.");
  } finally {
    setLoading(false);
  }
};


  const renderField = (label: string, field: keyof typeof student) => (
    <div className="flex flex-col gap-2">
      <p>{label}:</p>
      <input
        type="text"
        value={student[field] ?? ""}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="border px-3 py-2 rounded w-64"
      />
      {editedFields[field] !== undefined && <span className="text-red-500">●</span>}
    </div>
  );

  const renderFieldDropdown = (label: string, field: keyof typeof student, options: any[]) => (
  <div className="flex flex-col gap-2">
    <p>{label}:</p>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="border border-gray-300 rounded px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
        >
          {options.find(opt => opt.value === student[field])?.display || "Select status"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {options.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleFieldChange(field, option.value)}
          >
            {option.display}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    {editedFields[field] !== undefined && <span className="text-red-500">●</span>}
  </div>
);


  const renderFieldTextArea = (label: string, field: keyof typeof student) => (
    <div className="flex flex-col gap-2">
      <p>{label}:</p>
      <textarea
        value={student[field] ?? ""}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="border px-3 py-2 rounded w-64"
      />
      {editedFields[field] !== undefined && <span className="text-red-500">●</span>}
    </div>
  );

  return (
    <div className="flex flex-row w-full">
      {/* <Sidebar /> */}
      
      <div className="flex-1 py-4 px-6 bg-white shadow-md border rounded-md max-w-[700px]">
        <h1 className="text-xl font-bold">Student Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 space-y-4 mt-6">
          {renderField("Name", "name")}
          {renderField("Hanzi Name", "hanziName")}
          {/* <div className="col-span-2 grid grid-cols-subgrid gap-4">
           
          </div> */}
          {renderField("Pinyin Name", "pinyinName")}
          {renderField("Email", "email")}
          {renderField("Address", "address")}
          {renderField("Phone", "phoneNumber")}
          {renderFieldDropdown("Status", "status", STATUS)}
          {renderFieldTextArea("Notes", "notes")}
        </div>

        {/* <div className="mt-4 flex gap-2">
          <input
            type="number"
            value={tokenInput ?? ""}
            onChange={e => setTokenInput(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="Token amount"
            className="border px-2 py-1 rounded w-32"
          />
          <input
            type="text"
            value={paymentUrl}
            onChange={e => setPaymentUrl(e.target.value)}
            placeholder="Payment image URL"
            className="border px-2 py-1 rounded w-64"
          />
          <button
            className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50"
            onClick={handleAddTokensWithPayment}
            disabled={loading}
          >
            Add Token & Payment
          </button>
        </div> */}




        <div className="mt-6 flex gap-4 justify-end">
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
