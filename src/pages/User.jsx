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
import React, { useState, useEffect } from "react";

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
  const [rows, setRows] = useState([])

  // const getTotalUsers = (data)=>{
  //   // data = [{"address": "U/Dosa Kaduna","bus_stop": "SMC","created_at": "2023-04-30T21:23:14.456268","id": 9,"name": "Jamilu","phone_number": "+2348028752833","updated_at": "2023-04-30T21:26:33.212878"}]
  //   // write code to find total users, percentageChange from last month to current month and the change status whether it went up or down
  //   return {total, percentageChange, changeStatus}
  // }

  const getTotalUsers = (data) => {
    const currentMonthTotal = data.length;
  
    // Filter the data to get only the users created in the previous month
    const previousMonthData = data.filter(
      (user) => new Date(user.created_at).getMonth() === new Date().getMonth() - 1
    );
  
    // Calculate the total number of users in the previous month
    const previousMonthTotal = previousMonthData.length;
  
    // Calculate the percentage change from the previous month to the current month
    const percentageChange = (((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100).toFixed(1);;
  
    // Determine the change status based on the percentage change
    const changeStatus = percentageChange > 0 ? "up" : "down";
  
    return { total: currentMonthTotal, percentageChange, changeStatus };
  };
  
  const getCurrentUsers = (data) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthData = data.filter(
      (user) => new Date(user.created_at).getMonth() === currentMonth && new Date(user.created_at).getFullYear() === currentYear
    );
    const currentMonthTotal = currentMonthData.length;
  
    // Filter the data to get only the users created in the previous month
    const previousMonthData = data.filter(
      (user) => new Date(user.created_at).getMonth() === currentMonth - 1 && new Date(user.created_at).getFullYear() === currentYear
    );
  
    // Calculate the total number of users in the previous month
    const previousMonthTotal = previousMonthData.length;
  
    // Calculate the percentage change from the previous month to the current month
    const percentageChange = (((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100).toFixed(1);
  
    // Determine the change status based on the percentage change
    const changeStatus = percentageChange > 0 ? "up" : "down";
  
    return { total: currentMonthTotal, percentageChange, changeStatus };
  };
  

  useEffect(() => {
    fetch("https://42f0-102-91-47-135.ngrok-free.app/customers", {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM5OTkyOTUsImlhdCI6MTY4MzkxOTU5Mywic3ViIjoyLCJyb2xlIjoiYWRtaW4ifQ.pOgfNurI8Dmi5HAjqAS5gCcIVGmkBcbD2w228bc1kys",
      },
    })
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Full Name", sortable: false, width: 350 },
    { field: "phone_number", headerName: "Phone Number", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 90,
    // },
  ];

  // const rows = [
  //   {
  //     id: 2,
  //     lastName: "Lannister",
  //     firstName: "Cersei",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 3,
  //     lastName: "Lannister",
  //     firstName: "Jaime",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 1,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 4,
  //     lastName: "Stark",
  //     firstName: "Arya",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 5,
  //     lastName: "Targaryen",
  //     firstName: "Daenerys",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 6,
  //     lastName: "Melisandre",
  //     firstName: null,
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 7,
  //     lastName: "Clifford",
  //     firstName: "Ferrara",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 8,
  //     lastName: "Frances",
  //     firstName: "Rossini",
  //     email: "i.aliyu019@gmail.com",
  //   },
  //   {
  //     id: 9,
  //     lastName: "Roxie",
  //     firstName: "Harvey",
  //     email: "i.aliyu019@gmail.com",
  //   },
  // ];
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
              <Typography variant="h1">{getTotalUsers(rows).total}</Typography>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                <span style={{ color: "#00AC4F", fontWeight: 700 }}>
                  {" "}
                  {getTotalUsers(rows).changeStatus === 'up'? <><ArrowUpward /> {getTotalUsers(rows).percentageChange}%{" "}</>:<><ArrowDownward /> {getTotalUsers(rows).percentageChange}%{" "}</>}
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
              <Typography variant="h1">{getCurrentUsers(rows).total}</Typography>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                <span style={{ color: "#00AC4F", fontWeight: 700 }}>
                  {" "}
                  {getCurrentUsers(rows).changeStatus === 'up'? <><ArrowUpward /> {getCurrentUsers(rows).percentageChange}%{" "}</>:<><ArrowDownward /> {getCurrentUsers(rows).percentageChange}%{" "}</>}
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
