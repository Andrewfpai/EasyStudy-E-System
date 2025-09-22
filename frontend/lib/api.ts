import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getStudents = () => api.get("/students");
export const addStudent = (data: any) => api.post("/students", data);

// console.log("getStudents",getStudents)