import React from "react";
import routes from "./routes";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import StudentLayoutStyle from "./StudentLayoutStyle";
import { withStyles } from "@material-ui/core";
import SideBar from "../../AppBar/SideBar";
import {
  StudentDetailsSuspense,
  ExamsSuspense,
  LessonsSuspense,
  MessageSuspense,
  CameraSuspense,
  TestSuspense,
} from "./StudentAppLayout";

class StudentLayout extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <SideBar routes={routes} {...rest} color="grey" />
        <div className={classes.mainPanel} ref="mainPanel">
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                <Route
                  path="/student"
                  exact
                  component={StudentDetailsSuspense}
                />
                <Route
                  path="/student/message"
                  exact
                  component={MessageSuspense}
                />
                <Route
                  path="/student/exams/camera"
                  exact
                  component={CameraSuspense}
                />
                <Route
                  path="/student/lessons"
                  exact
                  component={LessonsSuspense}
                />
                <Route
                  path="/student/test-reslut"
                  exact
                  component={TestSuspense}
                />
                <Route path="/student/exams" exact component={ExamsSuspense} />
                <Route path="*" render={() => <Redirect to="/student" />} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(StudentLayoutStyle)(StudentLayout));
