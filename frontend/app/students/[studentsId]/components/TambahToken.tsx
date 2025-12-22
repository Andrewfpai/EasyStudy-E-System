"use client";

import { useState } from "react";
import { Student } from "@/app/types/student";
import { addTokensWithPayment } from "@/lib/api";
import SuccessCard from "@/app/add-new-student/SuccessCard";

interface TambahTokenProps {
  student: Student;
  onUpdate?: (updatedStudent: Student) => void; // optional callback to update parent state
}

export default function TambahToken({ student, onUpdate }: TambahTokenProps) {
  const [tokenInput, setTokenInput] = useState<number | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddTokensWithPayment = async () => {
    if (!tokenInput || loading) return;

    setLoading(true);
    try {
      const updated = await addTokensWithPayment(student.id, tokenInput, paymentUrl);
      onUpdate?.(updated); // update parent state if callback provided
      setTokenInput(null);
      setPaymentUrl("");
      setShowSuccess(true);
      
    } catch (err) {
      console.error(err);
  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-md mt-4">
      <div className="flex gap-2">
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
      </div>
      <button
        className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50"
        onClick={handleAddTokensWithPayment}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Token & Payment"}
      </button>

      {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition transition-opacity duration-300">
            <SuccessCard
                header="Token Berhasil Ditambahkan!"
                body={`Token sudah berhasil ditambahkan ke sistem.\nSilakan cek di halaman Data Diri.`}
                onClose={() => setShowSuccess(false)}
                />
            {/* <button
                onClick={() => setShowSuccess(false)}
                className="absolute inset-0 w-full h-full cursor-pointer"
                aria-label="Close modal"
            /> */}
            </div>
        )}
    </div>
  );
}
