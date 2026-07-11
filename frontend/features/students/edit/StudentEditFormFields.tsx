import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "@/types/student";
import  DatePickerField  from "@/features/students/form/DatePickerField";
import  SelectWithOtherField  from "@/features/students/form/SelectWithOtherField";
import { useStudentEditFormState } from "./useStudentEditFormState";

const MemoizedSelect = memo(Select);

interface StudentEditFormFieldsProps {
  student: Student;
  form: ReturnType<typeof useStudentEditFormState>;
}

export function StudentEditFormFields({ student, form }: StudentEditFormFieldsProps) {
  return (
    <>
      <div className="flex flex-col">
        <label className="mb-2 font-bold">Email</label>
        <input ref={form.emailRef} defaultValue={student.email} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <DatePickerField
        label="Tanggal Masuk Les"
        value={form.joinedDate}
        onSelect={form.setJoinedDate}
        open={form.openJoined}
        onOpenChange={form.setOpenJoined}
      />

      <div className="grid grid-cols-3 space-x-4">
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Harga Les</label>
          <MemoizedSelect value={form.lessonPrice} onValueChange={form.setLessonPrice}>
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
              <SelectValue placeholder="Select price" />
            </SelectTrigger>
            <SelectContent>
              {["Rp2.200.000", "Rp3.600.000"].map((price) => (
                <SelectItem key={price} value={price}>{price}</SelectItem>
              ))}
            </SelectContent>
          </MemoizedSelect>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-bold">Tipe Harga</label>
          <MemoizedSelect value={form.tipeHarga} onValueChange={(v) => form.setTipeHarga(v as "Lama" | "Baru")}>
            <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
              <SelectValue placeholder="Select tipe harga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lama">Lama</SelectItem>
              <SelectItem value="Baru">Baru</SelectItem>
            </SelectContent>
          </MemoizedSelect>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Start Level Mandarin</label>
        <MemoizedSelect value={form.startLevel} onValueChange={form.setStartLevel}>
          <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {["Basic", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map((level) => (
              <SelectItem key={level} value={level} className="!py-3">{level}</SelectItem>
            ))}
          </SelectContent>
        </MemoizedSelect>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Nama Indonesia</label>
        <input ref={form.nameRef} defaultValue={student.name} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Nama Mandarin</label>
        <input ref={form.hanziNameRef} defaultValue={student.hanziName ?? ""} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Jenis Kelamin</label>
        <MemoizedSelect value={form.gender} onValueChange={form.setGender}>
          <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {["Laki-laki", "Perempuan"].map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </MemoizedSelect>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Alamat</label>
        <input ref={form.addressRef} defaultValue={student.address} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <DatePickerField
        label="Tanggal Lahir"
        value={form.birthDate}
        onSelect={form.setBirthDate}
        open={form.openBirth}
        onOpenChange={form.setOpenBirth}
        align="start"
      />

      <div className="flex flex-col">
        <label className="mb-2 font-bold">No. Telepon Murid</label>
        <input ref={form.phoneRef} defaultValue={student.phoneNumber} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Nama Orang Tua</label>
        <input ref={form.parentNameRef} defaultValue={student.parentName} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">No. Telepon Orang Tua</label>
        <input ref={form.parentPhoneRef} defaultValue={student.parentPhone} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <SelectWithOtherField
        label="Pendidikan"
        value={form.isPredefinedEducation ? form.normalizedEducation : "Lainnya"}
        onValueChange={form.setEducation}
        options={["SD", "SMP", "SMA", "Kuliah", "Lainnya"]}
        customRef={form.customEducationRef}
        customPlaceholder="Tulis pendidikan Anda"
      />

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Sekolah / Perusahaan</label>
        <input ref={form.schoolRef} defaultValue={student.schoolOrCompany} className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition" />
      </div>

      <SelectWithOtherField
        label="Tujuan Les Mandarin"
        value={form.isPredefinedMandarinGoal ? form.normalizedMandarinGoal : "Lainnya"}
        onValueChange={form.setMandarinGoal}
        options={["Percakapan", "HSK", "Pekerjaan", "Wisata", "Lainnya"]}
        customRef={form.customMandarinGoalRef}
        customPlaceholder="Tulis tujuan Anda"
      />

      <SelectWithOtherField
        label="Mengetahui kursus Easy Study dari"
        value={form.isPredefinedHeardFrom ? form.normalizedHeardFrom : "Lainnya"}
        onValueChange={form.setHeardFrom}
        options={["Google", "Rekomendasi Teman", "Instagram/Facebook", "Acara Seminar", "Anggota keluarga", "Lainnya"]}
        customRef={form.customHeardFromRef}
        customPlaceholder="Tulis sumber Anda"
      />

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Status Murid</label>
        <MemoizedSelect value={form.status} onValueChange={(v) => form.setStatus(v as "Aktif" | "Nonaktif" | "Keluar")}>
          <SelectTrigger className="w-full px-4 py-2 border border-E-gray-b rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-base !h-auto">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {["Aktif", "Nonaktif", "Keluar"].map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </MemoizedSelect>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-bold">Catatan</label>
        <textarea
          ref={form.notesRef}
          defaultValue={student.notes ?? ""}
          placeholder="Tulis catatan disini ..."
          className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition h-28 resize-y placeholder:text-E-gray"
        />
      </div>
    </>
  );
}