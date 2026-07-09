import NormalField from "@/features/students/components/StudentForm/NormalField";
import SelectWithOtherField from "@/features/students/components/StudentForm/SelectWithOtherField";
import type { RefObject } from "react";

type StudentFormFieldsRightProps = {
  phoneNumberRef: RefObject<HTMLInputElement>;
  parentNameRef: RefObject<HTMLInputElement>;
  parentPhoneRef: RefObject<HTMLInputElement>;
  schoolOrCompanyRef: RefObject<HTMLInputElement>;
  customEducationRef: RefObject<HTMLInputElement>;
  customMandarinGoalRef: RefObject<HTMLInputElement>;
  customHeardFromRef: RefObject<HTMLInputElement>;
  notesRef: RefObject<HTMLTextAreaElement>;

  education: string;
  setEducation: (val: string) => void;

  mandarinGoal: string;
  setMandarinGoal: (val: string) => void;

  heardFrom: string;
  setHeardFrom: (val: string) => void;
};

export default function StudentFormFieldsRight({
  phoneNumberRef, parentNameRef, parentPhoneRef, schoolOrCompanyRef,
  customEducationRef, customMandarinGoalRef, customHeardFromRef, notesRef,
  education, setEducation,
  mandarinGoal, setMandarinGoal,
  heardFrom, setHeardFrom,
}: StudentFormFieldsRightProps) {
  return (
    <div className="space-y-6 flex flex-col h-full">
      <NormalField label="Nomor HP Whatsapp" type="tel" refValue={phoneNumberRef} />

      <NormalField label="Nama Orangtua/Wali Murid" type="text" refValue={parentNameRef} />
      <NormalField label="Nomor HP Orangtua" type="tel" refValue={parentPhoneRef} />

      <SelectWithOtherField
        label="Pendidikan"
        value={education}
        onChange={setEducation}
        customHeardFromRef={customEducationRef}
        options={["SD", "SMP", "SMA", "Kuliah", "Lainnya"]}
      />

      <NormalField label="Nama Sekolah atau Perusahaan" type="text" refValue={schoolOrCompanyRef} />

      <SelectWithOtherField
        label="Tujuan Les Mandarin"
        value={mandarinGoal}
        onChange={setMandarinGoal}
        customHeardFromRef={customMandarinGoalRef}
        options={["Percakapan", "HSK", "Pekerjaan", "Wisata", "Lainnya"]}
      />

      <SelectWithOtherField
        label="Mengetahui kursus Easy Study dari"
        value={heardFrom}
        onChange={setHeardFrom}
        customHeardFromRef={customHeardFromRef}
        options={["Google", "Rekomendasi Teman", "Instagram/Facebook", "Acara Seminar", "Anggota keluarga", "Lainnya"]}
      />

      <div className="flex flex-col flex-1">
        <label className="mb-2 font-bold">Notes</label>
        <textarea
          ref={notesRef}
          placeholder="Tulis catatan disini ..."
          className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition h-full resize-y placeholder:text-E-gray"
        />
      </div>
    </div>
  );
}