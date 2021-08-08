import * as actionTypes from "../services/action_type";
import * as teacherApi from "../../api/teacherApi";

export function createTeacherSuccess(data) {
    return { type: actionTypes.CREATE_TEACHER, data };
  }
  
  export function updateSuccess(data) {
    return { type: actionTypes.UPDATE_TEACHER, data };
  }
  
  export function deleteTeacherSuccess(data) {
    return { type: actionTypes.DELETE_TEACHER, data: data };
  }
  

  
  export function GetMessageSuccess(data) {
    return { type: actionTypes.GET_MESSAGE, data: data };
  }
  
  export function getTeacherSuccess(data) {
    return { type: actionTypes.GET_TEACHER, data: data };
  }
  
  export function deleteMessageSuccess(data) {
    return { type: actionTypes.DELETE_MESSAGE, data: data };
  }
  

  
  export function createTeacher(teacher) {
    return function (dispatch) {
      return teacherApi
        .createTeacher(teacher)
        .then((data) => {
          dispatch(createTeacherSuccess(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }
  
  export function getMessage(data) {
    return function (dispatch) {
      return teacherApi
        .getMessage(data)
        .then((data) => {
          dispatch(GetMessageSuccess(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }
  

  
  export function updateTeacher(teacher) {
    return function (dispatch) {
      return teacherApi
        .updateTeacher(teacher)
        .then((data) => {
          dispatch(updateSuccess(data));
          // return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }
  
  export function getTeacher() {
    return function (dispatch) {
      return teacherApi
        .getTeacher()
        .then((data) => {
          dispatch(getTeacherSuccess(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }
  
  export function deleteTeacher(id) {
    return function (dispatch) {
      return teacherApi
        .deleteTeacher(id)
        .then((data) => {
          dispatch(deleteTeacherSuccess(data));
          return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }

  export function deleteMessage(id) {
    return function (dispatch) {
      debugger
      return teacherApi
        .deleteMessage(id)
        .then((data) => {
          dispatch(deleteMessageSuccess(data));
          // return data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }
