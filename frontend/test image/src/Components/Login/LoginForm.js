import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  withStyles,
} from "@material-ui/core";
import * as studentActions from "../../redux/actions/studentActions";
import { toast } from "react-toastify";
import { LoginStyle } from "./style";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: { username: "", email: "", password: "", name: "", year: "" },
    };
  }

  submitHandler = async (e) => {
    const data = JSON.parse(JSON.stringify(this.state.details));
    try {
      await this.props.studentActions.createStudent(data);
      toast.success("New student added successfully.");
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      e.preventDefault();
    }
  };

  handleChange = (e) => {
    let details = JSON.parse(JSON.stringify(this.state.details));
    details[e.target.name] = e.target.value;
    this.setState({ details });
  };

  render() {
    const { classes } = this.props;
    const { details } = this.state;
    return (
      <form>
        <Grid>
          <Grid className={classes.grid}>
            <Typography className={classes.textHead}>
              Student SignUp Form
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
                      onChange={this.handleChange}
                      value={details.name}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.text}>Year</Typography>
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className={classes.input}
                      name="year"
                      id="year"
                      onChange={this.handleChange}
                      value={details.year}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                      value={details.password}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Grid item xs={12} className={classes.signUpGrid}>
              <input
                type="button"
                value="CREATE"
                onClick={this.submitHandler}
                className={classes.studentLogin}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
  };
}

export default compose(
  withStyles(LoginStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginForm);
