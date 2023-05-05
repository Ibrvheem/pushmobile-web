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
  NotificationsNone,
  NotificationsNoneOutlined,
  SubjectOutlined,
  TableChartOutlined,
  VerifiedUserTwoTone,
} from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { format } from "date-fns";

const drawerWidth = 300;
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
      width: "100%",
      fontSize: "2rem",
      borderRadius: "1rem",
    },
    active: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "1rem",
      color: "white",
      fontSize: "2rem",
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
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Layout({ children }) {
  let location = useLocation();
  let navigate = useNavigate();
  const classes = useStyles();
  const menuItems = [
    {
      Text: "Users",
      Icon: <VerifiedUserTwoTone color="primary" />,
      Path: "/users",
    },
    {
      Text: "Requests",
      Icon: <TableChartOutlined color="primary" />,
      Path: "/create",
    },
  ];
  return (
    <div className={classes.page}>
      <AppBar color="textSecondary" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="body2" className={classes.date}>
            {" "}
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography variant="body2">Ibrahim</Typography>
          <Avatar src="/Images/profile--pic.jfif" className={classes.avatar} />
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
                    fontSize: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                  className={
                    location.pathname == menuItem.Path
                      ? classes.active
                      : classes.notActive
                  }
                  onClick={() => {
                    navigate(menuItem.Path);
                  }}
                >
                  <ListItemIcon>{menuItem.Icon}</ListItemIcon>
                  {menuItem.Text}
                  <ListItemIcon>
                    {
                      <ChevronRight
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
