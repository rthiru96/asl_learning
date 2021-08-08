import axios from "./base";

export function studentLogin(credentials) {
  return axios.post("/student/login", credentials);
}

export function teacherLogin(credentials) {
  return axios.post("/login", credentials);
}
