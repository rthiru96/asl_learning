import React, { Fragment, useRef, useState, useEffect } from "react";
import { Camera } from "react-cam";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { Grid, withStyles, Typography } from "@material-ui/core";
import { studentStyle } from "./style";
import { toast } from "react-toastify";
import * as studentActions from "../../redux/actions/studentActions";

const Message = (props) => {
  const [students, setStudent] = useState([]);
  const [message, setMessage] = useState();
  const { classes } = props;

  useEffect(() => {
    props.studentActions.getStudent().then((data) => setStudent(data));
  }, []);

  const cam = useRef(null);
  const capture = async (imgSrc) => {
    const data = new FormData();
    try {
      data.append("file", imgSrc);
      await props.studentActions.sendMessageImage(data).then((img) => {
        if (!!img.letter) {
          if (!!message) {
            setMessage(message + img.letter);
            return;
          }
          setMessage(img.letter);
          return toast.success("well done correct answer.");
        }
        return toast.error("In Correct");
      });
    } catch (ex) {
      toast.error("Network Error");
      toast.error(ex);
    } finally {
    }
  };

  const sentMessage = async () => {
    let id = localStorage.getItem("user");
    let data = students.filter((data) => data.username === id);
    try {
      const tempdata = {studentid:data[0].id, message:message}
      await props.studentActions.sendMessage( tempdata);
    } catch (ex) {
      console.error(ex);
    }
  };

  const textEdit =(e)=>{
    setMessage(e.target.value)
  }
  return (
    <Fragment>
      <Camera
        showFocus={true}
        front={true}
        capture={capture}
        ref={cam}
        width="1080"
        height="720"
        focusWidth="18%"
        focusHeight="40%"
        btnColor="white"
      />
      <button
        className={classes.loginButton}
        onClick={(img) => cam.current.capture(img)}
      >
        Take image
      </button>
      <Grid style={{ marginTop: "3%" }}>
        <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
          Student Message
        </Typography>
        <input onChange={textEdit} type="text" value={message} style={{ padding: "20px 250px" }} />
        <button onClick={sentMessage} className={classes.signUpButtonNew}>
          Send Message
        </button>
      </Grid>
    </Fragment>
  );
};

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
)(Message);
