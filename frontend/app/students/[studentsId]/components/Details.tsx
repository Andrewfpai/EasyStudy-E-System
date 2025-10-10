"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { updateStudentData, addTokensWithPayment } from "@/lib/api";
import { formatDate } from "@/utils/date";

export default function Details({ student: initialStudent }) {
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

  const renderFieldDropdown = (label: string, field: keyof typeof student, options: any) => (
    <p className="flex items-center gap-2">
      {/* {console.log("options",options)} */}
      <strong>{label}:</strong>
      <select value={student[field] ?? ""} onChange={(e) => handleFieldChange(field, e.target.value)}>
        {options?.map(option=>{
          return <option key={option.value} value={option.value}>{option.display}</option>
        })}
      </select>
      {editedFields[field] !== undefined && <span className="text-red-500">●</span>}
    </p>
  )

  const renderFieldTextArea = (label: string, field: keyof typeof student) => (
    <p className="flex items-center gap-2">
      <strong>{label}:</strong>
      <textarea
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
          {renderFieldDropdown("Status", "status", STATUS)}
          {renderFieldTextArea("Notes", "notes")}
        </div>

        <div className="mt-4 flex gap-2">
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
      </div>


        <div>
          <div>TOKEN ADDED HISTORY</div>
          {student["tokenAddHistory"]?.map(tokenAdd=>(
            <div key={tokenAdd.id}>{formatDate(tokenAdd.createdAt)}</div>
          ))}
        </div>
        <div>
          <div>TOKEN USAGE HISTORY</div>
          {student["tokenUsageHistory"]?.map(tokenUsage=>(
            <div key={tokenUsage.id}>{formatDate(tokenUsage.createdAt)}</div>
          ))}
        </div>
        <div>
          <div>PAYMENT HISTORY</div>
          {student["payments"]?.map(payment=>(
            <div key={payment.id}>{payment.imageUrl}</div>
          ))}
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
