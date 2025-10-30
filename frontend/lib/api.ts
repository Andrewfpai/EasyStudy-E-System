import axios from "axios";

interface Student {
  id: number;
  name: string;
  hanziName: string | null;
  pinyinName: string | null;
  email: string;
  address: string;
  phoneNumber: number;
  tokenUsed: number;
  tokenRemaining: number;
  joinedDate: string;
  status: "ACTIVE" | "OUT" | "TEMP_INACTIVE";
}

const api = axios.create({
  baseURL: "https://dichotomous-catastrophically-shirly.ngrok-free.dev",
});

export const getStudents = async (): Promise<Student[]> => {
  const res = await api.get<Student[]>("/students");
  return res.data;
};

export const addStudent = async (data: Omit<Student, "id" | "joinedDate">): Promise<Student> => {
  const res = await api.post<Student>("/students", data);
  return res.data;
};

export const getStudentById = async (id: string): Promise<Student> => {
  const res = await api.get<Student>(`/students/${id}`);
  return res.data;
};

export const updateStudentData = async (
  id: string,
  data: Partial<Omit<Student, "id" | "joinedDate">>
): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}`, data);
  return res.data;
};

export const subtractStudentTokens = async (id: string, tokenAmount: number): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}/subtract-tokens`, { tokenAmount });
  return res.data;
};

export const addTokensWithPayment = async (id: string, tokenAmount: number, paymentUrl: string): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}/add-tokens-with-payment`, { tokenAmount, paymentUrl });
  return res.data;
};
