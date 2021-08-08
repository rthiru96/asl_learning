const LoginStyle = (theme) => ({
  gridHeader: {
    padding: "20px",
  },
  grid: {
    padding: "20px 30px",
  },
  loginButton: {
    backgroundColor: "#009DDE",
    marginTop: "0.4%",
    color: "#FFFFFF",
    padding: "5px 10px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#009DDE",
    },
  },
  signUpButton: {
    backgroundColor: "#4CAF50",
    transform: "translate(10px, 0.2px)",
    color: "#FFFFFF",
    padding: "5px 10px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#4CAF50",
    },
  },
  buttonGrid: {
    padding: "10px",
  },
  textHead: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#4d6188",
  },
  loginButtonProgressWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-34px",
  },
  loginButtonProgress: {
    color: "#3657b5",
  },
  text: {
    color: "#52acffdb",
    fontWeight: "bold",
    fontSize: "16px",
  },
  table: {
    border: "solid 3px #EBEBEB",
    transform: "translate(650px, 10px)",
  },
  studentLogin: {
    backgroundColor: "#009DDE",
    transform: "translate(10px, 0.2px)",
    color: "#FFFFFF",
    borderRadius: "10px",
    border: "1px solid #009DDE",
    padding: "10px 30px",
    "&:hover,&:focus": {
      boxShadow: "none",
      backgroundColor: "#009DDE",
    },
  },
  signUpGrid: {
    padding: "20px",
    transform: "translate(640px, 10px)",
  },
  input: {
    padding: "5px 20px",
    borderRadius: "5px",
  },
});

export { LoginStyle };
