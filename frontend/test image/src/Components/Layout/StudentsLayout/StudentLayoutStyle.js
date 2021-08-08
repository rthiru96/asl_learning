const StudentsLayout = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100%",
  },
  mainPanel: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${260}px)`,
    },
    height: "100vh",
    float: "right",
    width: "100%",
    overflowScrolling: "touch",
  },
  mainPanelClose: {
    position: "relative",
    height: "100vh",
    float: "right",

    width: "100%",
    overflowScrolling: "touch",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    minHeight: "35px",
  },
  content: {
    flexGrow: 1,
    padding: "0px",

    marginTop: "0px",
    height: `calc(100vh - ${74}px)`,
  },
  container: {
    height: `calc(100vh - ${50}px)`,
  },
});

export default StudentsLayout;
