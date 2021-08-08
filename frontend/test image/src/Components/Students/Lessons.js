import React from "react";
import { Grid, Card, withStyles } from "@material-ui/core";
import lesson from "./images/s.png";
import { studentStyle } from "./style";

class Lessons extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={11} className={classes.gridImage}>
        <Card style={{ paddingRight: "10px", paddingLeft: "10px" }}>
          <img src={lesson} alt="data" style={{ width: "70%" }} />
        </Card>
      </Grid>
    );
  }
}
export default withStyles(studentStyle)(Lessons);
