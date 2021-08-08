import * as actionTypes from "../services/action_type";
import initialState from "../services/initialState";

export default function loginReducer(state = initialState.auth, action) {
  switch (action.type) {
    case actionTypes.STUDENT_LOGIN:
      return { ...state, auth: action.data };
    case actionTypes.TEACHER_LOGIN:
      return { ...state, auth: action.data };
    default:
      return state;
  }
}
