import { useRef, useState } from "react";
import { Student } from "@/types/student";
import { updateStudentData } from "@/lib/api";
import { formatDateToUTC } from "@/utils/date";

export function useStudentEditFormState(student: Student, onSaved?: () => void) {
  const nameRef = useRef<HTMLInputElement>(null);
  const hanziNameRef = useRef<HTMLInputElement>(null);
  const pinyinNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const parentNameRef = useRef<HTMLInputElement>(null);
  const parentPhoneRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const customEducationRef = useRef<HTMLInputElement>(null);
  const customMandarinGoalRef = useRef<HTMLInputElement>(null);
  const customHeardFromRef = useRef<HTMLInputElement>(null);

  const [joinedDate, setJoinedDate] = useState<Date | undefined>(
    student.joinedDate ? new Date(student.joinedDate) : undefined
  );
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    student.birthDate ? new Date(student.birthDate) : undefined
  );
  const [tokenRemaining, setTokenRemaining] = useState(student.tokenRemaining);
  const [lessonPrice, setLessonPrice] = useState(student.lessonPrice);
  const [tipeHarga, setTipeHarga] = useState(student.tipeHarga);
  const [startLevel, setStartLevel] = useState(student.startLevel);
  const [gender, setGender] = useState(student.gender);
  const [status, setStatus] = useState(student.status);
  const [education, setEducation] = useState(student.education);
  const [mandarinGoal, setMandarinGoal] = useState(student.mandarinGoal);
  const [heardFrom, setHeardFrom] = useState(student.heardFrom);

  const [openJoined, setOpenJoined] = useState(false);
  const [openBirth, setOpenBirth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const normalizedEducation = education && education.trim() !== "" ? education : "Lainnya";
  const isPredefinedEducation = ["SD", "SMP", "SMA", "Kuliah"].includes(normalizedEducation);

  const normalizedMandarinGoal = mandarinGoal && mandarinGoal.trim() !== "" ? mandarinGoal : "Lainnya";
  const isPredefinedMandarinGoal = ["Percakapan", "HSK", "Pekerjaan", "Wisata", "Lainnya"].includes(normalizedMandarinGoal);

  const normalizedHeardFrom = heardFrom && heardFrom.trim() !== "" ? heardFrom : "Lainnya";
  const isPredefinedHeardFrom = ["Google", "Rekomendasi Teman", "Instagram/Facebook", "Acara Seminar", "Anggota keluarga", "Lainnya"].includes(normalizedHeardFrom);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateStudentData(student.id, {
        name: nameRef.current?.value ?? "",
        hanziName: hanziNameRef.current?.value ?? "",
        pinyinName: pinyinNameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        address: addressRef.current?.value ?? "",
        phoneNumber: phoneRef.current?.value ?? "",
        parentName: parentNameRef.current?.value ?? "",
        parentPhone: parentPhoneRef.current?.value ?? "",
        schoolOrCompany: schoolRef.current?.value ?? "",
        notes: notesRef.current?.value ?? "",
        tokenRemaining,
        lessonPrice,
        tipeHarga,
        startLevel,
        gender,
        status,
        education: education === "Lainnya" ? customEducationRef.current?.value ?? "" : education,
        mandarinGoal: mandarinGoal === "Lainnya" ? customMandarinGoalRef.current?.value ?? "" : mandarinGoal,
        heardFrom: heardFrom === "Lainnya" ? customHeardFromRef.current?.value ?? "" : heardFrom,
        joinedDate: joinedDate ? formatDateToUTC(joinedDate) : "",
        birthDate: birthDate ? formatDateToUTC(birthDate) : "",
      });

      setShowSuccess(true);
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  };

  return {
    nameRef, hanziNameRef, pinyinNameRef, emailRef, addressRef, phoneRef,
    parentNameRef, parentPhoneRef, schoolRef, notesRef,
    customEducationRef, customMandarinGoalRef, customHeardFromRef,
    joinedDate, setJoinedDate,
    birthDate, setBirthDate,
    tokenRemaining, setTokenRemaining,
    lessonPrice, setLessonPrice,
    tipeHarga, setTipeHarga,
    startLevel, setStartLevel,
    gender, setGender,
    status, setStatus,
    education, setEducation,
    mandarinGoal, setMandarinGoal,
    heardFrom, setHeardFrom,
    openJoined, setOpenJoined,
    openBirth, setOpenBirth,
    loading,
    showSuccess, setShowSuccess,
    normalizedEducation, isPredefinedEducation,
    normalizedMandarinGoal, isPredefinedMandarinGoal,
    normalizedHeardFrom, isPredefinedHeardFrom,
    handleSave,
  };
}