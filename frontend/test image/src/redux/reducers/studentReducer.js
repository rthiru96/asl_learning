import * as actionTypes from "../services/action_type";
import initialState from "../services/initialState";

export default function studentReducer(state = initialState.student, action) {
  switch (action.type) {
    case actionTypes.GET_STUDENT:
      return { ...state, studentList: action.data };
    default:
      return state;
  }
}
