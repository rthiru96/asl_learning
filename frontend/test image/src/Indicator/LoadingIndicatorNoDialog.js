import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import GridItem from "../Grid/GridItem";

const loadingStyle = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function LoadingIndicatorNoDialog(props) {
  return (
    <div style={props.style}>
      <GridItem item xs={12} align="center">
        <div style={loadingStyle}>
          {!!props.text ? (
            <Typography>{props.text}</Typography>
          ) : (
            <CircularProgress
              style={{ color: "#3E5964" }}
              thickness={props.thickness}
              size={props.size}
            />
          )}
        </div>
      </GridItem>
    </div>
  );
}

export default LoadingIndicatorNoDialog;
