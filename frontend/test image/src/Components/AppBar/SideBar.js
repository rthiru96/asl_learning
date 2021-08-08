import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Typography,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  themeFont: {
    color: "#3E5964",
  },
  list: {
    // marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: "#FFFFFF",
    },
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "3px 10px 0",
    borderRadius: "3px",
    position: "relative",
    padding: "4px 26px",
    backgroundColor: "transparent",
  },
  itemIcon: {
    width: "20px",
    minWidth: "20px",
    height: "30px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#3E5964",
  },
  itemText: {
    margin: "0",
    lineHeight: "30px",
    fontSize: "12px",
    fontWeight: "500",
    padding: "0 0",
    color: "#3E5964", //
    textTransform: "uppercase",
  },
}));

function SideBar(props) {
  const { routes, color } = props;
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("reslut");
    history.push("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openAnchor}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
          {routes.map((text, index) => {
            if (text.redirect) return null;
            var activePro = " ";
            var listItemClasses = classNames({
              [" " + classes[color]]: activeRoute(text.path),
            });

            const whiteFontClasses = classNames({
              [" " + classes.themeFont]: activeRoute(text.path),
            });
            return (
              <NavLink
                to={text.path}
                className={activePro + classes.item}
                activeClassName="active"
                key={index}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                    {typeof text.icon === "string" ? (
                      <Icon>{text.icon}</Icon>
                    ) : (
                      <text.icon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.sidebarName}
                    className={classes.itemText + whiteFontClasses}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default SideBar;
