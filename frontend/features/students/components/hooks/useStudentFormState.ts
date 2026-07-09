// features/students/components/StudentForm/useStudentFormState.ts
import { useRef, useState } from "react";
import { addStudent } from "@/lib/api";
import { formatDateToUTC } from "@/utils/date";

export function useStudentFormState(onStudentAdded: () => void) {
  // ----- Input refs -----
  const nameRef = useRef<HTMLInputElement>(null);
  const hanziNameRef = useRef<HTMLInputElement>(null);
  const pinyinNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const parentNameRef = useRef<HTMLInputElement>(null);
  const parentPhoneRef = useRef<HTMLInputElement>(null);
  const customEducationRef = useRef<HTMLInputElement>(null);
  const schoolOrCompanyRef = useRef<HTMLInputElement>(null);
  const customMandarinGoalRef = useRef<HTMLInputElement>(null);
  const customHeardFromRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // ----- Reactive state -----
  const [joinedDate, setJoinedDate] = useState<Date | undefined>(undefined);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [tokenRemaining, setTokenRemaining] = useState(16);
  const [lessonPrice, setLessonPrice] = useState("Rp2.200.000");
  const [status, setStatus] = useState<"Aktif" | "Nonaktif" | "Keluar">("Aktif");
  const [tipeHarga, setTipeHarga] = useState<"Lama" | "Baru">("Lama");
  const [startLevel, setStartLevel] = useState("Basic");
  const [gender, setGender] = useState("Laki-laki");
  const [education, setEducation] = useState("");
  const [mandarinGoal, setMandarinGoal] = useState("");
  const [heardFrom, setHeardFrom] = useState("");

  const [openJoined, setOpenJoined] = useState(false);
  const [openBirth, setOpenBirth] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setJoinedDate(undefined);
    setBirthDate(undefined);
    setTokenRemaining(16);
    setLessonPrice("Rp2.200.000");
    setStatus("Aktif");
    setTipeHarga("Lama");
    setStartLevel("Basic");
    setGender("Laki-laki");
    setEducation("");
    setMandarinGoal("");
    setHeardFrom("");

    [
      nameRef, hanziNameRef, pinyinNameRef, emailRef, addressRef, phoneNumberRef,
      parentNameRef, parentPhoneRef, customEducationRef, schoolOrCompanyRef,
      customMandarinGoalRef, customHeardFromRef, notesRef,
    ].forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        name: nameRef.current?.value ?? "",
        hanziName: hanziNameRef.current?.value ?? "",
        pinyinName: pinyinNameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        address: addressRef.current?.value ?? "",
        phoneNumber: phoneNumberRef.current?.value ?? "",
        tokenUsed: 0,
        tokenRemaining,
        joinedDate: joinedDate ? formatDateToUTC(joinedDate) : new Date().toISOString(),
        birthDate: birthDate ? formatDateToUTC(birthDate) : new Date().toISOString(),
        startLevel,
        gender,
        parentName: parentNameRef.current?.value ?? "",
        parentPhone: parentPhoneRef.current?.value ?? "",
        education: education === "Lainnya" ? customEducationRef.current?.value ?? "" : education,
        schoolOrCompany: schoolOrCompanyRef.current?.value ?? "",
        mandarinGoal: mandarinGoal === "Lainnya" ? customMandarinGoalRef.current?.value ?? "" : mandarinGoal,
        heardFrom: heardFrom === "Lainnya" ? customHeardFromRef.current?.value ?? "" : heardFrom,
        lessonPrice,
        status,
        tipeHarga,
        notes: notesRef.current?.value ?? "",
      };

      await addStudent(studentData);
      setShowSuccess(true);
      resetForm();
      onStudentAdded?.();
    } catch (error) {
      console.error(error);
      alert("Failed to add student.");
    }
  };

  return {
    // refs
    nameRef, hanziNameRef, pinyinNameRef, emailRef, addressRef, phoneNumberRef,
    parentNameRef, parentPhoneRef, customEducationRef, schoolOrCompanyRef,
    customMandarinGoalRef, customHeardFromRef, notesRef,
    // values + setters
    joinedDate, setJoinedDate,
    birthDate, setBirthDate,
    tokenRemaining, setTokenRemaining,
    lessonPrice, setLessonPrice,
    status, setStatus,
    tipeHarga, setTipeHarga,
    startLevel, setStartLevel,
    gender, setGender,
    education, setEducation,
    mandarinGoal, setMandarinGoal,
    heardFrom, setHeardFrom,
    openJoined, setOpenJoined,
    openBirth, setOpenBirth,
    showSuccess, setShowSuccess,
    // action
    handleSubmit,
  };
}