import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  withStyles,
  Typography,
} from "@material-ui/core";
import { studentStyle } from "./style";

class Exams extends React.Component {
  handleClick = (e) => {
    this.props.history.push({
      pathname: `/student/exams/camera`,
      state: { actual: e.target.name },
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={8} className={classes.grid}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="A"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>A</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="B"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>B</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="C"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>C</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="D"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>D</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="E"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>E</Typography>
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  name="F"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>F</Typography>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="G"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>G</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="H"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>H</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="I"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>I</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="J"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>J</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="K"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>K</Typography>
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  name="L"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>L</Typography>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="M"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>M</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="N"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>N</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="O"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>O</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="P"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>P</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  Name="Q"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>Q</Typography>
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  name="R"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>R</Typography>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="S"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>S</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="T"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>T</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="U"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>U</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="V"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>V</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="W"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>W</Typography>
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  name="X"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>X</Typography>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="Y"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>Y</Typography>
                </Button>
              </TableCell>
              <TableCell className={classes.examBorder} align="center">
                <Button
                  name="Z"
                  className={classes.buttonExam}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Typography className={classes.buttonText}>Z</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    );
  }
}

export default withStyles(studentStyle)(Exams);
