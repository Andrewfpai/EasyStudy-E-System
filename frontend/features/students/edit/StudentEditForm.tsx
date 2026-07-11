"use client";
import { Student } from "@/types/student";
import SuccessCard from "@/components/common/SuccessCard";
import { useStudentEditFormState } from "./useStudentEditFormState";
import { StudentEditFormFields } from "./StudentEditFormFields";

interface StudentEditFormProps {
  student: Student;
  onSaved?: () => void;
}

export default function StudentEditForm({ student, onSaved }: StudentEditFormProps) {
  const form = useStudentEditFormState(student, onSaved);

  return (
    <form
      onSubmit={form.handleSave}
      className="mt-5 max-w-lg w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <div className="font-extrabold text-2xl">Edit Murid</div>

      <div className="space-y-4">
        <StudentEditFormFields student={student} form={form} />
      </div>

      <button
        type="submit"
        disabled={form.loading}
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg"
      >
        Save Changes
      </button>

      {form.showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition transition-opacity duration-300">
          <SuccessCard
            header="Data Berhasil Diperbarui!"
            body={`Data sudah berhasil diperbarui.\nSilakan cek di halaman Data Diri.`}
            onClose={() => form.setShowSuccess(false)}
          />
        </div>
      )}
    </form>
  );
}