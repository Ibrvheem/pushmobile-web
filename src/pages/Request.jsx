import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  ArrowDownward,
  ArrowDownwardOutlined,
  ArrowUpward,
} from "@material-ui/icons";
import { padding } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    request: {
      marginTop: "8rem",
      height: "100vh",
      width: "100%",
      backgroundColor: "lavender",
      position: "relative",
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
    customcell: {
      backgroundColor: "blue",
    },
    modal: {
      margin: "auto",
      // transform: "translate(-50%, -50%)",
      width: 400,
      height: 200,
      // backgroundColor: "red",
    },
    modalCard: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  };
});

function Request() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("https://42f0-102-91-47-135.ngrok-free.app/deliveries", {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM5MTkyODQsImlhdCI6MTY4MzgzMjg4OCwic3ViIjoyLCJyb2xlIjoiYWRtaW4ifQ.PvEAPfmjxKJMSvdv3wYKPVg4pSrDjsPzoNmk3TYmog4",
      },
    })
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },

    { field: "delivery_phone_number", headerName: "Phone Number", width: 100 },
    {
      field: "pickup",
      headerName: "Pick Up Address",
      width: 200,
    },
    {
      field: "delivery",
      headerName: "Delivery Address",
      width: 200,
    },

    {
      field: "item_category",
      headerName: "Item",
      width: 100,
    },
    {
      field: "item_type",
      headerName: "Size",
      width: 100,
    },
    {
      field: "unit",
      headerName: "Quantity",
      type: "number",
      width: 90,
    },
    {
      field: "status",
      headerName: "Delivery",
      type: "number",
      width: 90,
      renderCell: (params) => {
        const { value } = params;

        return value == "pending" ? (
          <img src="./Images/not-delivered.png" style={{ width: "3rem" }} />
        ) : (
          <img src="./Images/delivered.png" style={{ width: "3rem" }} />
        );
      },
    },
    {
      field: "payment_status",
      headerName: "Payment",
      width: 150,
      renderCell: (params) => {
        const { value } = params;

        return (
          <Button
            onClick={handleOpen}
            style={{
              fontSize: "1.2rem",
              border: ".1rem solid",
              borderColor: value == "pending" ? "#008767" : "#DF0404",
              backgroundColor:
                value == "pending" ? "rgba(22, 192, 152, .5)" : "#FFC5C5",
              color: value == "pending" ? "#008767" : "#DF0404",
              borderRadius: "1rem",
              // width: "12rem",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            {value}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={classes.modalCard} elevation={10}>
          <Typography id="modal-modal-title" variant="h2">
            Enter Delivery Fee
          </Typography>
          <div>
            <Typography variant="body1">
              Delivery From: 44a Isa Kaita Road Kaduna
            </Typography>
            <Typography variant="body1">
              Delivery To: 8a Sultan Road Kaduna
            </Typography>
            <Typography variant="body1"></Typography>
          </div>
          <TextField
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                  }}
                >
                  Send
                </Button>
              ),
            }}
          />
        </Card>
      </Modal>
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
                <Typography variant="body1">
                  Total Deliveries (MONTH)
                </Typography>
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
              style={{ fontSize: "1.4rem", padding: "0rem 3rem" }}
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
    </>
  );
}

export default Request;
