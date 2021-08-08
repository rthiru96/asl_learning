import React from "react";
import routes from "./routes";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import teacherLayout from "./TeacherLayoutStyle";
import { withStyles } from "@material-ui/core";
import SideBar from "../../AppBar/SideBar";
import { MessageSuspense } from "./TeachersAppLayout";

class TeacherLayout extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <SideBar routes={routes} {...rest} color="grey" />
        <div className={classes.mainPanel} ref="mainPanel">
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                <Route path="/teacher" exact component={MessageSuspense} />

                <Route path="*" render={() => <Redirect to="/teacher" />} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(teacherLayout)(TeacherLayout));
