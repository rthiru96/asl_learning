import React from "react";
import Login from "./Components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherLogin from "./Components/Login/TeacherLogin";
import TeacherSignUp from "./Components/Login/TeacherForm";
import SignUp from "./Components/Login/LoginForm";
import Header from "./Components/Header/Header";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import StudentsLayout from "./Components/Layout/StudentsLayout/StudentsLayout";
import TeacherLayout from "./Components/Layout/TeachersLayout/TeacherLayout";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={4500} />
      <Header />
      <Switch>
        <Route path="/teacher" component={TeacherLayout} />
        <Route path="/student" component={StudentsLayout} />
        <Route exact path="/" component={Login} />
        <Route exact path="/login/teacher" component={TeacherLogin} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/teacher-sign-up" component={TeacherSignUp} />
      </Switch>
    </div>
  );
}

export default App;
