import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as studentActions from "../../redux/actions/studentActions";

import {
  Table,
  TableBody,
  Typography,
  Grid,
  TableRow,
  TableCell,
  withStyles,
  TableHead,
} from "@material-ui/core";
import { studentStyle } from "./style";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

class Testscore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      keys: [],
      temvalues: [],
    };
  }

  async componentDidMount() {
    try {
      const students = await this.props.studentActions.getStudent();
      let temvalues = [];
      let temvaluesN = {};
      let user = localStorage.getItem("user");
      let result = localStorage.getItem("result");
      // !!result?.length &&
      //   result.map((data) => {
      //     for (const property in data) {
      //       temvaluesN = {
      //         keys: `${property}`,
      //         values: `${data[property]}`,
      //       };
      //       temvalues.push(temvaluesN);
      //     }
      //   });
      this.setState({ user, temvalues, students });
    } catch (ex) {
      console.error(ex);
    }
  }
  getStatus = (data) => {
    switch (data) {
      case true:
        return (
          <CheckCircleOutlineOutlinedIcon
            style={{
              color: "#008000",
              height: "35px",
              width: "35px",
            }}
          />
        );
      case false:
        return (
          <CancelOutlinedIcon
            style={{ color: "#FF0000", height: "35px", width: "35px" }}
          />
        );
      default:
        return (
          <CancelOutlinedIcon
            style={{ color: "#FF0000", height: "35px", width: "35px" }}
          />
        );
    }
  };
  render() {
    const { classes } = this.props;
    const { students, temvalues } = this.state;
    let data = JSON.parse(JSON.stringify(this.state.user));
    let name =
      !!students?.length &&
      JSON.parse(JSON.stringify(students)).filter(
        (std) => std.username === data
      );
    return (
      <Grid item xs={8} className={classes.grid}>
        <form>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography className={classes.insideText}>
                    User ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.insideText}>
                    User Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.insideText}> Score</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{!!name?.length && name[0].id}</TableCell>
                <TableCell>{this.state.user}</TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      {!!this.state.temvalues?.length &&
                        this.state.temvalues.map((data) => {
                          return (
                            <TableRow>
                              <TableCell>{data.keys}</TableCell>;
                              <TableCell>
                                {this.getStatus(data.values)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Grid>
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
  withStyles(studentStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(Testscore);
