import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Button,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  ListItem,
  ListItemText,
  List,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import useUser from "../queries/use-user";
import axios from "axios";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  button: {
    color: "white",
    opacity: 0.7,
    paddingTop: 12,
    "&:hover": {
      opacity: 1,
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerIcon: {
    height: "2em",
    width: "2em",
    padding: 0,
  },
  drawerIconContainer: {
    marginLeft: "auto",
    padding: 0,
  },
  drawerItem: {
    color: "white",
    opacity: 0.7,
    paddingLeft: 15,
    paddingRight: 10,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  tab: {
    minWidth: 10,
    marginRight: "5px",
  },
  tabContainer: {
    marginLeft: "auto",
    minHeight: 30,
    height: 40,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const history = useHistory();

  const { user, mutate, loggedOut } = useUser();

  const guestRoutes = [
    { name: "Login", link: "/login", activeIndex: 0 },
    { name: "Register", link: "/register", activeIndex: 1 },
  ];

  const userRoutes = [
    { name: "Polls", link: "/polls", activeIndex: 0 },
    { name: "Create", link: "/create", activeIndex: 1 },
    { name: "Public", link: "/public", activeIndex: 2 },
    { name: "Account", link: "/account", activeIndex: 3 },
  ];

  const adminRoutes = [
    ...userRoutes,
    { name: "Admin", link: "/admin", activeIndex: userRoutes.length },
  ];

  let routes = [];

  if (loggedOut) {
    routes = guestRoutes;
  } else if (user && !user.admin) {
    routes = userRoutes;
  } else {
    routes = adminRoutes;
  }

  const onLogout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    mutate(null);
    history.replace("/");
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const selectedRoute = routes.find((route) => route.link === pathname);
    setValue(!selectedRoute ? false : selectedRoute.activeIndex);
  }, [routes]);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (loggedOut && !guestRoutes.find((route) => route.link === pathname)) {
      history.replace("/");
    }
  });

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={(e, value) => setValue(value)}
        className={classes.tabContainer}
      >
        {routes.map((route) => (
          <Tab
            className={classes.tab}
            key={route.link}
            label={route.name}
            onClick={() => history.push(route.link)}
          />
        ))}
      </Tabs>
      {!loggedOut && (
        <Button className={classes.button} onClick={onLogout}>
          Logout
        </Button>
      )}
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        classes={{ paper: classes.drawer }}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        open={openDrawer}
      >
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              button
              classes={{ selected: classes.drawerItemSelected }}
              divider
              key={route.link}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
                history.push(route.link);
              }}
              selected={value === route.activeIndex}
            >
              <ListItemText className={classes.drawerItem}>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        {!loggedOut && (
          <Button
            className={classes.button}
            onClick={onLogout}
            style={{ textTransform: "none" }}
          >
            <ListItemText>Logout</ListItemText>
          </Button>
        )}
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Button
              onClick={() => {
                setValue(false);
                history.push("/");
              }}
              disableRipple
            >
              <Typography variant="h2" noWrap>
                Survey Service
              </Typography>
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};
