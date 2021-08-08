const teacherStyle = (theme) => ({
  grid: {
    transform: "Translate(300px,50px)",
  },
  camera: {
    transform: "Translate(60px,10px)",
  },
  gridImage: {
    paddinTop: "40px",
    transform: "Translate(60px,50px)",
  },
  table: {
    border: "solid 3px #EBEBEB",
    borderRadius: "15px",
  },
  text: {
    color: "#338099",
    fontWeight: "bold",
    fontSize: "18px",
    padding: "20px 30px",
  },
  insideText: {
    color: "#52acffdb",
    fontWeight: "bold",
  },
  input: {
    borderRadius: "10px",
    padding: "5px 30px",
  },
  signUpButton: {
    backgroundColor: "#4CAF50",
    border: "solid 1px #4CAF50",
    borderRadius: "10px",
    transform: "translate(10px, 20px)",
    color: "#FFFFFF",
    padding: "10px 40px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#4CAF50",
    },
  },
  signUpButtonNew: {
    backgroundColor: "#4CAF50",
    border: "solid 1px #4CAF50",
    borderRadius: "10px",
    marginLeft: "0.3%",
    color: "#FFFFFF",
    padding: "10px 40px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#4CAF50",
    },
  },
  loginButton: {
    backgroundColor: "#009DDE",
    color: "#FFFFFF",
    padding: "10px 40px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#009DDE",
    },
  },
  examBorder: {
    borderRight: "solid 3px #EBEBEB",
  },
  buttonExam: {
    backgroundColor: "#0dbed0",
    borderRadius: "15px",
    padding: "25px 60px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#0dbed0",
    },
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export { teacherStyle };

