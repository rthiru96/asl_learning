import * as actionTypes from "../services/action_type";
import * as loginApi from "../../api/loginApi";

export function studentLoginSuccess(auth) {
  return { type: actionTypes.STUDENT_LOGIN, auth };
}

export function teacherLoginSuccess(auth) {
  return { type: actionTypes.STUDENT_LOGIN, auth };
}

export function studentLogin(credentials) {
  return function (dispatch) {
    return loginApi
      .studentLogin(credentials)
      .then((data) => {
        if (!data) {
          throw new Error("Login failed. Please check your credentials.");
        }
        localStorage.setItem("user", credentials.username);
        localStorage.setItem("loggedIn", true);
        const auth = {
          userName: credentials.username,
          loggedIn: true,
        };

        dispatch(studentLoginSuccess(auth));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
}

export function teacherLogin(credentials) {
  return function (dispatch) {
    return loginApi
      .teacherLogin(credentials)
      .then((data) => {
        if (!data) {
          throw new Error("Login failed. Please check your credentials.");
        }
        localStorage.setItem("user", credentials.user_name);
        localStorage.setItem("loggedIn", true);
        const auth = {
          userName: credentials.user_name,
        };

        dispatch(teacherLoginSuccess(auth));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
}
