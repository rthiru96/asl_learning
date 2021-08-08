import React from "react";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
import GridItem from "../Grid/GridItem";

const loadingStyle = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function LoadingIndicator(props) {
  return (
    <Dialog open={props.openIndicator}>
      <GridItem item xs={12} align="center">
        <DialogContent style={loadingStyle}>
          {!!props.text ? (
            <Typography>{props.text}</Typography>
          ) : (
            <CircularProgress
              style={{ color: "#3E5964" }}
              thickness={props.thickness}
              size={props.size}
            />
          )}
        </DialogContent>
      </GridItem>
    </Dialog>
  );
}

export default LoadingIndicator;
