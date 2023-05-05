import { Card, Container, Typography, makeStyles } from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { borderRadius } from "@mui/system";
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
    // overviewCards: {
    //   display: "flex",
    //   justifyContent: "space-between",
    //   width: "100%",
    // },
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
  };
});

function User() {
  const classes = useStyles();
  const columns = [
    { field: "firstName", headerName: "First name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 200 },
    { field: "id", headerName: "Phone Number", width: 200 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "address",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 350,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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
              <Typography variant="body1">Total Deliveries Made</Typography>
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
              <Typography variant="body1">Total Deliveries Made</Typography>
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
        </Card>
        <Card className={classes.overviewCard}>
          <div style={{ height: "auto", width: "100%" }}>
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
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default User;
