import React from "react";
import { AppBar, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ClickAwayListener } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Navbar from "../../../../components/Navbar/Navbar";
import clsx from "clsx";
import menuItems from "../../../../config/menuList";
import PropTypes from "prop-types";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: "100% !important",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  navDrawer: {
    width: drawerWidth,
    // Page size nave drawer options
    [theme.breakpoints.down("md")]: {
      width: drawerWidth,
      flexShrink: 0,
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  signedInUser: {
    padding: theme.spacing(1),
    cursor: "pointer",
  },
  hiddenSmallScreen: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  hiddenBigScreen: {
    [theme.breakpoints.up("md")]: {
      display: "none !important",
    },
  },
  hideMenu: {
    display: "none !important",
  },
}));

const Header = ({ user, authStatus, logOut }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const anchorRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    return () => {
      anchorRef && anchorRef.current && anchorRef.current.focus();
    };
  }, []);
  const handelToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };
  //Profile & Logout Menu
  const handleToggleBtn = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handelLogOut = (event) => {
    logOut();
    handleClose(event);
  };

  const handelProfileClick = (event) => {
    setMenuOpen(false);
    navigate("/profile");
  };
  return (
    <div className={classes.root}>
      {/* AppBar Implementation */}
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            onClick={handleToggleBtn}
            edge="start"
            className={clsx(classes.menuButton, classes.hiddenBigScreen)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            className={classes.title}
          >
            YoYo Gifting
          </Typography>
          <div
            className={clsx(classes.hiddenSmallScreen, {
              ["d-none"]: !authStatus,
            })}
          >
            {menuItems.map((ele) => {
              return (
                <Button
                  key={ele.id}
                  color={location.pathname === ele.path ? "primary" : "inherit"}
                  component={Link}
                  to={ele.path}
                >
                  {" "}
                  {ele.name}{" "}
                </Button>
              );
            })}
          </div>
          <div className={classes.signedInUser}>
            <Typography color="secondary">
              Hello, {user?.name || "Guest!"}
            </Typography>
          </div>

          <div
            className={clsx(classes.signedInUser, {
              [classes.hideMenu]: !authStatus,
            })}
          >
            <AccountCircleIcon
              ref={anchorRef}
              aria-controls={menuOpen ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handelToggle}
            />
            <Popper
              open={menuOpen}
              anchorEl={anchorRef.current}
              role={"Menu list grow"}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={menuOpen}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handelProfileClick}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handelLogOut}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          {!authStatus && (
            <div>
              <Button LinkComponent={Link} to="/login" color="inherit">
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Navbar {...classes} open={open} handleDrawerClose={handleToggleBtn} />
    </div>
  );
};

// props validation
Header.propTypes = {
  user: PropTypes.object.isRequired,
  authStatus: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Header;
