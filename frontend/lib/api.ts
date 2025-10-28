import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000", // your dev laptop IP
  baseURL: "http://192.168.132.217:5000", // your dev laptop IP
  // baseURL: "http://localhost:3001", // your dev laptop IP
});

export const getStudents = () => api.get("/students");
export const addStudent = (data: any) => api.post("/students", data);
export async function getStudentById(id: string) {
  const res = await axios.get(`http://localhost:5000/students/${id}`);
  return res.data;
}

export async function updateStudentData(id: string, data: Partial<Student>) {
  const res = await api.patch(`/students/${id}`, data);
  return res.data;
}

// export async function updateStudentTokens(id: string, change: number) {
//   const res = await axios.patch(`http://localhost:3001/students/${id}/tokens`, { change });
//   return res.data;
// }
// export async function addStudentTokens(id: string, tokenAmount: number) {
//   const res = await axios.patch(`http://localhost:3001/students/${id}/add-tokens`, { tokenAmount });
//   return res.data;
// }
export async function subtractStudentTokens(id: string, tokenAmount: number) {
  const res = await api.patch(`/students/${id}/subtract-tokens`, { tokenAmount });
  return res.data;
}
export async function addTokensWithPayment(id: string, tokenAmount: number, paymentUrl:string) {
  const res = await api.patch(`/students/${id}/add-tokens-with-payment`, { tokenAmount,paymentUrl});
  return res.data;
}
// console.log("getStudents",getStudents)