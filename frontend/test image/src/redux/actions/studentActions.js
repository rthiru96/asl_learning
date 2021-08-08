import * as actionTypes from "../services/action_type";
import * as studentApi from "../../api/studentApi";

export function createStudentSuccess(data) {
  return { type: actionTypes.CREATE_STUDENT, data };
}

export function updateSuccess(data) {
  return { type: actionTypes.UPDATE_STUDENT, data };
}

export function deleteStudentSuccess(data) {
  return { type: actionTypes.DELETE_STUDENT, data: data };
}

export function SendMessageImageSuccess(data) {
  return { type: actionTypes.SEND_MESSAGE_IMAGE, data: data };
}

export function SendMessageSuccess(data) {
  return { type: actionTypes.SEND_MESSAGE, data: data };
}

export function getStudentSuccess(data) {
  return { type: actionTypes.GET_STUDENT, data: data };
}

export function uploadSuccess(data) {
  return { type: actionTypes.UPLOAD_IMAGE, data };
}

export function createStudent(student) {
  return function (dispatch) {
    return studentApi
      .createStudent(student)
      .then((data) => {
        dispatch(createStudentSuccess(data));
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function sendMessage(data) {
  return function (dispatch) {
    return studentApi
      .sendMessage(data)
      .then((data) => {
        dispatch(SendMessageSuccess(data));
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function uploadImage(data) {
  return function (dispatch) {
    return studentApi
      .uploadImage(data)
      .then((data) => {
        dispatch(uploadSuccess(data));
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateStudent(student) {
  return function (dispatch) {
    return studentApi
      .updateStudent(student)
      .then((data) => {
        dispatch(updateSuccess(data));
        // return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getStudent() {
  return function (dispatch) {
    return studentApi
      .getStudent()
      .then((data) => {
        dispatch(getStudentSuccess(data));
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteStudent(id) {
  return function (dispatch) {
    return studentApi
      .deleteStudent(id)
      .then((data) => {
        dispatch(deleteStudentSuccess(data));
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function sendMessageImage(message) {
  return function (dispatch) {
    return studentApi
      .sendMessageImage(message)
      .then((data) => {
        dispatch(SendMessageImageSuccess(data));
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };
}
