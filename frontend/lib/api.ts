import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getStudents = () => api.get("/students");
export const addStudent = (data: any) => api.post("/students", data);
export async function getStudentById(id: string) {
  const res = await axios.get(`http://localhost:3001/students/${id}`);
  return res.data;
}

export async function updateStudentTokens(id: string, change: number) {
  const res = await axios.patch(`http://localhost:3001/students/${id}/tokens`, { change });
  return res.data;
}
// console.log("getStudents",getStudents)