import React from "react";
import {
  Table,
  TableBody,
  Typography,
  TableRow,
  TableCell,
  Grid,
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { studentStyle } from "./style";
import { toast } from "react-toastify";
import { Visibility } from "@material-ui/icons";
import * as studentActions from "../../redux/actions/studentActions";

class StudentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      username: "",
      edit: false,
      show: false,
    };
  }

  async componentDidMount() {
    try {
      await this.props.studentActions.getStudent();
      const username = localStorage.getItem("user");
      this.setState({ username });
    } catch (ex) {
      toast.error(ex);
    } finally {
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (!!nextProps.student?.length && !state.edit && !!state.username) {
      let tempData = JSON.parse(JSON.stringify(nextProps.student)).filter(
        (data) => data.username === state.username
      );
      state.student = tempData;
      return state.student;
    }
    return state;
  }

  click = () => {
    this.setState({ show: !this.state.show, edit: true });
  };

  handleChange = (e) => {
    let student = JSON.parse(JSON.stringify(this.state.student));
    student[0][e.target.name] = e.target.value;
    this.setState({ student, edit: true });
  };

  hadleSubmit = (e) => {
    const data = JSON.parse(JSON.stringify(this.state.student));
    const tempData = {
      id: data[0].id,
      created_on: data[0].created_on,
      name: data[0].name,
      username: data[0].username,
      email: data[0].email,
      password: data[0].password,
      updated_on: data[0].updated_on,
      year: data[0].year,
    };
    try {
      this.props.studentActions.updateStudent(tempData);
      toast.success(" student updated successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      e.preventDefault();
    }
  };

  render() {
    const { classes } = this.props;
    const { student } = this.state;
    return (
      <React.Fragment>
        <Grid item xs={6} className={classes.grid}>
          <Grid>
            <Typography className={classes.text}>
              Student Details Form
            </Typography>
          </Grid>
          <form onSubmit={this.hadleSubmit}>
            <Table className={classes.table}>
              {!!student?.length &&
                student.map((data, idx) => {
                  return (
                    <TableBody key={idx}>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            User ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            name="id"
                            type="text"
                            value={data.id}
                            className={classes.input}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            User Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                            value={data.username}
                            className={classes.input}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={this.handleChange}
                            className={classes.input}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            Email
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={this.handleChange}
                            className={classes.input}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            Year
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="year"
                            value={data.year}
                            onChange={this.handleChange}
                            className={classes.input}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            Password
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            type={this.state.show ? "text" : "password"}
                            name="password"
                            value={data.password}
                            onChange={this.handleChange}
                            className={classes.input}
                          />
                          <span>
                            <Visibility onClick={this.click} />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            Created On
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="created_on"
                            value={data.created_on}
                            className={classes.input}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.insideText}>
                            Updated On
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="updated_on"
                            value={data.updated_on || ""}
                            className={classes.input}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
            </Table>
            <Grid item xs={12}>
              <input
                type="submit"
                value="Update"
                className={classes.signUpButton}
              />
            </Grid>
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { student: state.student.studentList };
};

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
  };
}

export default compose(
  withStyles(studentStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(StudentDetails);
