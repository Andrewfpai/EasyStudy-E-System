"use client";
import { addStudent } from "../../lib/api";
import { formatDateToUTC } from "@/utils/date";
import SuccessCard from "@/components/common/SuccessCard";
import { useStudentFormState } from "@/features/students/form/useStudentFormState";
import StudentFormFieldLeft from "@/features/students/form/StudentFormFieldsLeft";
import StudentFormFieldRight from "@/features/students/form/StudentFormFieldsRight";

export default function StudentForm({ onStudentAdded }: { onStudentAdded: () => void }) {
  const state = useStudentFormState(onStudentAdded);
  const { handleSubmit, showSuccess, setShowSuccess } = state;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-5 overflow-auto mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
      >
        <div className="font-extrabold text-2xl pb-2">Tambah Murid</div>

        <div className="grid grid-cols-2 gap-5">
          <StudentFormFieldLeft {...state} />
          <StudentFormFieldRight {...state} />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-transparent hover:border hover:border-primary hover:text-primary cursor-pointer transition"
        >
          Add Student
        </button>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition transition-opacity duration-300">
          <SuccessCard
            header="Pendaftaran Berhasil!"
            body={`Murid baru sudah berhasil ditambahkan ke sistem.\nSilakan cek di halaman Semua Murid.`}
            onClose={() => setShowSuccess(false)}
          />
        </div>
      )}
    </div>
  );
}