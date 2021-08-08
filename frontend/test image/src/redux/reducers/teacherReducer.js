import * as actionTypes from "../services/action_type";
import initialState from "../services/initialState";

export default function teacherReducer(state = initialState.teacher, action) {
  switch (action.type) {
    case actionTypes.GET_TEACHER:
      return { ...state, teacherList: action.data };
    default:
      return state;
  }
}
