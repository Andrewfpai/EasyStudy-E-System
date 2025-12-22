import axios from "axios";

import { Student } from "@/app/types/student";

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

export const getStudentById = async (id: number): Promise<Student> => {

  if (isNaN(id)) {
    throw new Error(`Invalid student ID: ${id}. Must be a number.`);
  }
  const res = await api.get<Student>(`/students/${id}`);
  return res.data;
};

export const updateStudentData = async (
  id: number,
  data: Partial<Omit<Student, "id" >>
): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}`, data);
  return res.data;
};

export const subtractStudentTokens = async (id: number, tokenAmount: number): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}/subtract-tokens`, { tokenAmount });
  return res.data;
};

export const addTokensWithPayment = async (id: number, tokenAmount: number, paymentUrl: string): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}/add-tokens-with-payment`, { tokenAmount, paymentUrl });
  return res.data;
};

export const deleteStudentById = async (id: number): Promise<void> => {

  if (isNaN(id)) {
    throw new Error(`Invalid student ID: ${id}. Must be a number.`);
  }
  await api.delete<Student>(`/students/${id}`);
  
};