import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
  Container,
} from "@material-ui/core";
import {
  AddCircleOutlineSharp,
  CheckBox,
  ChevronRight,
  Dashboard,
  NotificationsNone,
  NotificationsNoneOutlined,
  SubjectOutlined,
  TableChartOutlined,
  VerifiedUserTwoTone,
} from "@material-ui/icons";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { format } from "date-fns";

const drawerWidth = 240;
const useStyles = makeStyles(function (theme) {
  return {
    page: {
      backgroundColor: "#f9f9f9",
      display: "flex",
      // padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth,
    },
    paperDrawer: {
      width: drawerWidth,
    },
    notActive: {
      width: "50%",
      fontSize: "1.4rem",
      borderRadius: "1rem",
    },
    active: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "1rem",
      color: "white",
      fontSize: "1.4rem",
      width: "100%",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },

    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Layout({ children }) {
  let location = useLocation();
  let history = useHistory();
  const classes = useStyles();
  const menuItems = [
    {
      Text: "Dashboard",
      Icon: <Dashboard color="primary" />,
      Path: "/dashboard",
    },
    {
      Text: "Users",
      Icon: <VerifiedUserTwoTone color="primary" />,
      Path: "/users",
    },
    {
      Text: "Agents",
      Icon: <VerifiedUserTwoTone color="primary" />,
      Path: "/agents",
    },
    {
      Text: "Requests",
      Icon: <TableChartOutlined color="primary" />,
      Path: "/requests",
    },
  ];
  return (
    <div className={classes.page}>
      <AppBar color="textSecondary" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Avatar
              src="/Images/profile--pic.jfif"
              className={classes.avatar}
            />
            <Typography variant="h2">Hello Admin</Typography>
          </div>
          <Typography variant="body1" className={classes.date}>
            {" "}
            {format(new Date(), "do MMMM Y")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paperDrawer }}
      >
        <Container>
          <Typography variant="h2" className={classes.title}>
            PUSH MOBILE
          </Typography>
          <List>
            {menuItems.map(function (menuItem) {
              return (
                <ListItem
                  key={menuItem.Text}
                  button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  className={
                    location.pathname == menuItem.Path
                      ? classes.active
                      : classes.notActive
                  }
                  onClick={() => {
                    history.push(menuItem.Path);
                  }}
                >
                  {/* <ListItemIcon>{menuItem.Icon}</ListItemIcon> */}
                  <div>{menuItem.Text}</div>
                  <ListItemIcon>
                    {
                      <ChevronRight
                        // style={{ padding: 0 }}
                        className={
                          location.pathname == menuItem.Path
                            ? classes.active
                            : classes.notActive
                        }
                      />
                    }
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Drawer>

      {children}
    </div>
  );
}

export default Layout;
