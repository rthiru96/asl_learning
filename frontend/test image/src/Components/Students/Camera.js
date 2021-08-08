import React, { Fragment, useRef, useState, useEffect } from "react";
import { Camera } from "react-cam";
import { connect } from "react-redux";

import { compose, bindActionCreators } from "redux";
import { toast } from "react-toastify";
import * as studentActions from "../../redux/actions/studentActions";

const WebCam = (props) => {
  const cam = useRef(null);

  const [value, setValue] = useState(localStorage.getItem("reslut") || []);
  // const [tempReslut, settempReslut] = useState([]);

  console.log(value,'value');
  useEffect(()=>{
    if(!value){
      localStorage.setItem("reslut",[])
    }
  })
  

  const capture = async (imgSrc) => {
    const actual = props.location.state.actual;
    // const name = JSON.parse(JSON.stringify(actual));


    const test = new FormData();
    try {
      test.append("file", imgSrc);
      test.append("actual", actual);
      await props.studentActions.uploadImage(test).then((img) => {
        if (!!img.match) {
          let datanew = {
            [actual]: img.match,
          };
          
          if(!!value){
            

let obj = {value,datanew};


const arr = [].concat(...Object.values(obj))
console.log(arr,"array");
            localStorage.setItem("reslut", JSON.stringify(arr));
           }
            localStorage.setItem("reslut", JSON.stringify(datanew));
          return toast.success("well done correct answer.");
        }
        let datanew = {
          [actual]: img.match,
        };
 if(!!value){
  let obj = {value,datanew};


  const arr = [].concat(...Object.values(obj))
  console.log(arr,"array -wrong");
              localStorage.setItem("reslut", JSON.stringify(arr));
  localStorage.setItem("reslut", JSON.stringify(arr));
 }
        localStorage.setItem("reslut", JSON.stringify(datanew));
        
        return toast.error("In Correct");
      });
      props.history.push("/student/exams");
    } catch (ex) {
      toast.error("Network Error");
      toast.error(ex);
    }
  };

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
      <button onClick={(img) => cam.current.capture(img)}>Take image</button>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(WebCam);
