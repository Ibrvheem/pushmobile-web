import { Card, Container, Typography, makeStyles } from "@material-ui/core";
import {
  ArrowDownward,
  ArrowDownwardOutlined,
  ArrowUpward,
} from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    request: {
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
  };
});

function Request() {
  const rows = [
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Enroute",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Enroute",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Enroute",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Delivered",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Delivered",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "NOT Delivered",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Enroute",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Delivered",
      item: "Indomie",
      itemSize: "Very Big",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      addressTo: "44a, Isa Kaita, Kaduna",
      addressFrom: "10, LEGISTLATIVE QUARTERS, KADUNA",
      status: "Delivered",
      item: "Indomie",
      itemSize: "Very Big",
    },
  ];
  const columns = [
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "id", headerName: "Phone Number", width: 100 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "addressTo",
      headerName: "Pick Up Address",
      width: 250,
    },
    {
      field: "addressFrom",
      headerName: "Delivery Address",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "item",
      headerName: "Item",
      width: 100,
    },
    {
      field: "itemSize",
      headerName: "Size",
      width: 100,
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.request}>
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
              <Typography variant="body1">Total Deleveries</Typography>
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
              <Typography variant="body1">Pending Deliveries</Typography>
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
              <Typography variant="body1">Completed Deliveries</Typography>
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
              <Typography variant="body1">Total Deliveries (MONTH)</Typography>
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
        </Card>
      </Container>
    </div>
  );
}

export default Request;
