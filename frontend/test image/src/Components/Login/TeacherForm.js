import React, { useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  withStyles,
} from "@material-ui/core";
import * as teacherActions from "../../redux/actions/teacherActions";
import { LoginStyle } from "./style";
import { toast } from "react-toastify";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";

function TeacherForm(props) {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    role: null,
  });

 const submitHandler = async (e) => {
    const data = JSON.parse(JSON.stringify(details));
    console.log(data)
    try {
      await props.teacherActions.createTeacher(data);
      toast.success("New teacher added successfully.");
      props.history.push("/login/teacher");
    } catch (err) {
      console.error(err);
    } finally {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleIntChange = (e) => {
    setDetails({ ...details, [e.target.name]: parseInt(e.target.value) });
  };

  const { classes } = props;
  return (
    <form>
      <Grid>
        <Grid className={classes.grid}>
          <Typography className={classes.textHead}>
            Teacher SignUp Form
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography className={classes.text}>Name</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    className={classes.input}
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={details.name}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography className={classes.text}>Role</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    className={classes.input}
                    name="role"
                    id="role"
                    onChange={handleIntChange}
                    value={details.role}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography className={classes.text}>Email</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type="email"
                    name="email"
                    className={classes.input}
                    id="email"
                    onChange={handleChange}
                    value={details.email}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography className={classes.text}>User Name</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="username"
                    className={classes.input}
                    id="username"
                    onChange={handleChange}
                    value={details.username}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography className={classes.text}>Password</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type="password"
                    className={classes.input}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={details.password}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Grid item xs={12} className={classes.signUpGrid}>
            <input
              type="submit"
              value="CREATE"
              onClick={submitHandler}
              className={classes.studentLogin}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    teacherActions: bindActionCreators(teacherActions, dispatch),
  };
}

export default compose(
  withStyles(LoginStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(TeacherForm);


