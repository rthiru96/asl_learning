import axios from "./base";

export function createStudent(student) {
  return axios.post("/student", student);
}

export function getStudent() {
  return axios.get("/student");
}

export function updateStudent(student) {
  return axios.put("/student", student);
}

export function sendMessageImage(data) {
  return axios.post("/letterpredict", data);
}

export function sendMessage(data) {
  return axios.post("/messenger", data);
}

export function deleteStudent(id) {
  return axios.delete("/student?id=" + id);
}

export function uploadImage(data) {
  return axios.post("/predict", data);
}
