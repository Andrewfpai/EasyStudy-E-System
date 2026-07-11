import DatePickerField from "@/features/students/form/DatePickerField";
import SelectWithOtherField from "@/features/students/form/SelectWithOtherField";
import NormalField from "@/features/students/form/NormalField";
import SelectField from "@/features/students/form/SelectField";
import type { RefObject } from "react";

type StudentFormFieldsLeftProps = {
  emailRef: RefObject<HTMLInputElement>;
  nameRef: RefObject<HTMLInputElement>;
  hanziNameRef: RefObject<HTMLInputElement>;
  addressRef: RefObject<HTMLInputElement>;

  joinedDate: Date | undefined;
  setJoinedDate: (date: Date | undefined) => void;
  openJoined: boolean;
  setOpenJoined: (open: boolean) => void;

  birthDate: Date | undefined;
  setBirthDate: (date: Date | undefined) => void;
  openBirth: boolean;
  setOpenBirth: (open: boolean) => void;

  tokenRemaining: number;
  setTokenRemaining: (val: number) => void;

  lessonPrice: string;
  setLessonPrice: (val: string) => void;

  tipeHarga: "Lama" | "Baru";
  setTipeHarga: (val: "Lama" | "Baru") => void;

  startLevel: string;
  setStartLevel: (val: string) => void;

  gender: string;
  setGender: (val: string) => void;
};

export default function StudentFormFieldsLeft({
  emailRef, nameRef, hanziNameRef, addressRef,
  joinedDate, setJoinedDate, openJoined, setOpenJoined,
  birthDate, setBirthDate, openBirth, setOpenBirth,
  tokenRemaining, setTokenRemaining,
  lessonPrice, setLessonPrice,
  tipeHarga, setTipeHarga,
  startLevel, setStartLevel,
  gender, setGender,
}: StudentFormFieldsLeftProps) {
  return (
    <div className="space-y-6">
      <NormalField label="Email" type="email" refValue={emailRef} />

      <DatePickerField
        label="Tanggal Masuk Les"
        value={joinedDate}
        onSelect={setJoinedDate}
        open={openJoined}
        onOpenChange={setOpenJoined}
        placeholder="Pilih Tanggal"
      />

      <div className="grid grid-cols-3 space-x-4">
        <SelectField label="Token" value={tokenRemaining.toString()} onChange={value => setTokenRemaining(+value)} options={["16", "8"]} />
        <SelectField label="Harga Les" value={lessonPrice} onChange={setLessonPrice} options={["Rp2.200.000", "Rp3.600.000"]} />
        <SelectField label="Tipe Harga" value={tipeHarga} onChange={setTipeHarga} options={["Lama", "Baru"]} />
      </div>

      <SelectField label="Start Level Mandarin" value={startLevel} onChange={setStartLevel} options={["Basic", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"]} />

      <NormalField label="Nama Indonesia" type="text" refValue={nameRef} />
      <NormalField label="Nama Mandarin" type="text" refValue={hanziNameRef} />

      <SelectField label="Jenis Kelamin" value={gender} onChange={setGender} options={["Laki-laki", "Perempuan"]} />

      <NormalField label="Alamat Tempat Tinggal" type="text" refValue={addressRef} />

      <DatePickerField
        label="Tanggal Lahir"
        value={birthDate}
        onSelect={setBirthDate}
        open={openBirth}
        onOpenChange={setOpenBirth}
        placeholder="Pilih Tanggal"
      />
    </div>
  );
}