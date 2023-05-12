import {
  Card,
  Container,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  ArrowDownward,
  ArrowUpward,
  Search,
  SearchRounded,
} from "@material-ui/icons";
import { borderRadius, width } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    users: {
      marginTop: "8rem",
      height: "100vh",
      width: "100%",
      backgroundColor: "lavender",
    },

    icon: {
      height: "5rem",
      width: "5rem",
      backgroundColor: theme.palette.primary.light,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    eachInfo: {
      width: "24%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "3rem",
      textAlign: "center",
      borderRight: "2px solid #F0F0F0",
    },
    overviewCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "2rem 0rem",
      margin: "3rem 0rem",
      // flexDirection: "row",
      // gap: "4rem",
      width: "100%",
      borderRadius: "3rem",
    },
    tableHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 3rem",
    },
  };
});

function User() {
  const classes = useStyles();
  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 350,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "id", headerName: "Phone Number", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 90,
    // },
  ];

  const rows = [
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      email: "i.aliyu019@gmail.com",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      email: "i.aliyu019@gmail.com",
    },
  ];
  return (
    <div className={classes.users}>
      <Container>
        <Card className={classes.overviewCard} elevation={0}>
          <div className={classes.eachInfo}>
            <div className={classes.icon}>
              <img
                src="./Images/profile-2user.png"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  height: "3rem",
                }}
                alt=""
              />
            </div>
            <div className={classes.info}>
              <Typography variant="body1">Total Users</Typography>
              <Typography variant="h1">5,424</Typography>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                <span style={{ color: "#00AC4F", fontWeight: 700 }}>
                  {" "}
                  <ArrowUpward /> 16%{" "}
                </span>
                this month
              </Typography>
            </div>
          </div>
          <div className={classes.eachInfo}>
            <div className={classes.icon}>
              <img
                src="./Images/profile-tick.png"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  height: "3rem",
                }}
                alt=""
              />
            </div>
            <div className={classes.info}>
              <Typography variant="body1">New Users</Typography>
              <Typography variant="h1">5,424</Typography>
              <Typography variant="body1">
                <span style={{ color: "#DF0404", fontWeight: 700 }}>
                  {"  "}
                  <ArrowDownward /> 16% {"  "}
                </span>
                this month
              </Typography>
            </div>
          </div>
        </Card>
        <Card className={classes.overviewCard}>
          <div style={{ height: "auto", width: "100%" }}>
            <Container>
              <div className={classes.tableHeader}>
                <Typography variant="h2">All Users</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Search"
                  InputProps={{
                    style: {
                      borderRadius: "3rem",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded style={{ fontSize: "2rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <DataGrid
                rows={rows}
                columns={columns}
                style={{ fontSize: "2rem", padding: "0rem 3rem" }}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 20]}
              />
            </Container>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default User;
