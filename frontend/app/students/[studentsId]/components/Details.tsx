"use client"
import { useState } from "react";
import { Student } from "@/app/types/student";
import { formatForDisplay } from "@/utils/date";
import { addTokensWithPayment } from "@/lib/api";

interface DetailsProps {
  studentsInput: Student;
}

export default function Details({ studentsInput }: DetailsProps) {
  const [student, setStudent] = useState<Student>(studentsInput);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenInput, setTokenInput] = useState<number | null>(null);

  // Map all fields with labels
  const studentDataMap = [
    { label: "ID", value: student.id },
    { label: "Nama", value: student.name },
    { label: "Nama Mandarin", value: `${student.hanziName ?? "-"} (${student.pinyinName ?? "-"})` },
    { label: "Nomor HP", value: student.phoneNumber },
    { label: "Email", value: student.email },
    { label: "Alamat", value: student.address },
    { label: "Tanggal Bergabung", value: formatForDisplay(student.joinedDate)?.date },
    { label: "Tanggal Lahir", value: student.birthDate ? formatForDisplay(student.birthDate)?.date : "-" },
    { label: "Start Level", value: student.startLevel ?? "-" },
    { label: "Jenis Kelamin", value: student.gender ?? "-" },
    { label: "Nama Orangtua", value: student.parentName ?? "-" },
    { label: "Nomor HP Orangtua", value: student.parentPhone ?? "-" },
    { label: "Pendidikan", value: student.education ?? "-" },
    { label: "Sekolah / Perusahaan", value: student.schoolOrCompany ?? "-" },
    { label: "Tujuan Belajar", value: student.mandarinGoal ?? "-" },
    { label: "Dengar Easystudy dari", value: student.heardFrom ?? "-" },
    { label: "Harga Les", value: student.lessonPrice ?? "-" },
    { label: "Token Terpakai", value: student.tokenUsed },
    { label: "Token Sisa", value: student.tokenRemaining },
    { label: "Status", value: student.status },
    { label: "Tipe Harga", value: student.tipeHarga ?? "-" },
    { label: "Notes", value: student.notes ?? "-" },
    { label: "Terakhir Diedit", value: student.updatedAt ? formatForDisplay(student.updatedAt)?.date : "-" },
  ];

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
 
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col bg-white rounded-2xl py-4 mt-8 max-w-[700px]">
        <div className="font-extrabold text-2xl px-6">Detail Informasi Diri</div>

        <div className="flex flex-col border border-background mx-6 mt-6">
          {studentDataMap.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 px-6 py-3 ${
                index % 2 === 0 ? "bg-background" : ""
              }`}
            >
              <p className="font-bold col-span-2">{item.label}</p>
              <p className="font-medium col-start-3 col-span-full break-words whitespace-pre-wrap">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="number"
            value={tokenInput ?? ""}
            onChange={(e) => setTokenInput(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="Token amount"
            className="border px-2 py-1 rounded w-32"
          />
          <input
            type="text"
            value={paymentUrl}
            onChange={(e) => setPaymentUrl(e.target.value)}
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
      </div>
    </div>
  );
}
