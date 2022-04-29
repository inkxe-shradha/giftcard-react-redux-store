import { useTheme } from "@emotion/react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Paper,
} from "@mui/material";

import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import menuItems from "../../config/menuList";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = ({
  drawer,
  open,
  handleDrawerClose,
  toolbar,
  drawerPaper,
  navDrawer,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className={navDrawer}>
      <Paper
        sx={{ display: { xs: "none", sm: "block", md: "block" } }}
        className={drawerPaper}
      >
        <Drawer
          variant="temporary"
          elevation={0}
          open={open}
          className={drawer}
          onClose={handleDrawerClose}
          classes={{
            paper: drawerPaper,
          }}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Paper>
    </nav>
  );
};

export default Navbar;
