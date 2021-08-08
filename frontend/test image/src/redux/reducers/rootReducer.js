import { combineReducers } from "redux";
import login from "./loginReducer";
import student from "./studentReducer";
import teacher from "./teacherReducer";

const rootReducer = combineReducers({
  login,
  student,
  teacher
});

export default rootReducer;
