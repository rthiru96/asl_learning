import axios from "./base";

export function getTeacher() {
  return axios.get("/user");
}

export function createTeacher(user) {
  return axios.post("/user", user);
}

export function updateTeacher(user) {
  return axios.put("/user", user);
}

export function deleteTeacher(userid) {
  return axios.delete("/user?userid=" + userid);
}

export function getMessage() {
  return axios.get("/messenger");
}

export function deleteMessage(id) {
  return axios.delete("/messenger", id);
}
