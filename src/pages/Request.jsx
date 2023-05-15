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
import { padding, width } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

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

function Request({ detail }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState("");
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("user"));
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(false);
  // console.log(JSON.parse(data).token);
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const countDeliveriesByStatus = (rows, status) => {
    // Filter the rows by status first
    const filteredRows = rows.filter((row) => row.status === status);

    const currentTotal = filteredRows.length;

    // Filter the rows to get those created in the current month
    const currentDate = new Date();
    const currentMonthRows = filteredRows.filter((row) => {
      const createdDate = new Date(row.created_at);
      return (
        createdDate.getMonth() === currentDate.getMonth() &&
        createdDate.getFullYear() === currentDate.getFullYear()
      );
    });

    // Filter the rows to get those created in the previous month
    const previousMonthRows = filteredRows.filter((row) => {
      const createdDate = new Date(row.created_at);
      const previousMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      const endOfPreviousMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      return (
        createdDate >= previousMonthDate &&
        createdDate <= endOfPreviousMonthDate
      );
    });

    const previousMonthCount = previousMonthRows.length;
    const percentChange =
      previousMonthCount !== 0
        ? ((currentMonthRows.length - previousMonthCount) /
            previousMonthCount) *
          100
        : currentMonthRows.length > 0
        ? Infinity
        : 0;

    const resultStatus = percentChange >= 0 ? "up" : "down";

    return { total: currentTotal, percentChange, status: resultStatus };
  };

  const countTotalDeliveries = (rows) => {
    const currentTotal = rows.length;

    // Filter the rows to get those created in the current month
    const currentMonthRows = rows.filter((row) => {
      const createdDate = new Date(row.created_at);
      const currentDate = new Date();
      return (
        createdDate.getMonth() === currentDate.getMonth() &&
        createdDate.getFullYear() === currentDate.getFullYear()
      );
    });

    // Filter the rows to get those created in the previous month
    const previousMonthRows = rows.filter((row) => {
      const createdDate = new Date(row.created_at);
      const currentDate = new Date();
      const previousMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      const endOfPreviousMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      return (
        createdDate >= previousMonthDate &&
        createdDate <= endOfPreviousMonthDate
      );
    });

    const previousMonthCount = previousMonthRows.length;
    const percentChange =
      previousMonthCount > 0
        ? ((currentMonthRows.length - previousMonthCount) /
            previousMonthCount) *
          100
        : null;
    const status = percentChange !== null && percentChange >= 0 ? "up" : "down";

    return { total: currentTotal, percentChange, status };
  };

  function handlePayment(id) {
    setLoader(true);
    fetch(`${process.env.REACT_APP_API_URL}/delivery/payment/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }).then((res) => {
      if (res.ok) {
        // alert("Invoice Sent");
        handleClose();
        setLoader(false);
        window.location.reload();
      } else if (res.status === "400") {
        alert("Invoice Not Sent");
        setLoader(false);
      }
    });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/deliveries`, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          history.push("/");
        } else if (!res.ok) {
          throw new Error("Request failed with status " + res.status);
        }
        return res.json();
      })
      .then((data) => setRows(data))
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "pickup_name",
      headerName: "Sender",
      description: "This column has a value getter and is not sortable.",
      sortable: false,

      // flex: 1,
      width: 170,
    },
    {
      field: "delivery_name",
      headerName: "Receiver",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      // flex: 1,
      width: 170,
    },

    { field: "pickup_phone_number", headerName: "Sender's No.", width: 150 },
    { field: "delivery_phone_number", headerName: "Receiver No.", width: 150 },
    // {
    //   field: "pickup",
    //   headerName: "Pick Up Address",
    //   width: 200,
    // },
    // {
    //   field: "delivery",
    //   headerName: "Delivery Address",
    //   width: 200,
    // },

    {
      field: "item_category",
      headerName: "Item",
      // flex: 1,
      width: 160,
    },
    // {
    //   field: "item_type",
    //   headerName: "Size",
    //   flex: 1,
    //   // width: 100,
    // },
    {
      field: "unit",
      headerName: "Quantity",
      type: "number",
      // flex: 1,
      width: 50,
    },
    {
      field: "status",
      headerName: "Delivery",
      type: "number",
      // flex: 1,
      width: 100,
      renderCell: (params) => {
        const { value } = params;

        return value == "ready" ? (
          <img src="./Images/not-delivered.png" style={{ width: "3rem" }} />
        ) : value == "transit" ? (
          <img src="./Images/delivery.png" style={{ width: "3rem" }} />
        ) : (
          <img src="./Images/delivered.png" style={{ width: "3rem" }} />
        );
      },
    },
    {
      field: "payment_status",
      headerName: "Payment",
      // width: 150,
      renderCell: (params) => {
        const { value } = params;

        return (
          <Button
            onClick={value == "pending" ? () => handleOpen(params.row) : null}
            style={{
              fontSize: "1.2rem",
              border: ".1rem solid",
              borderColor: value == "pending" ? "#DF0404" : "#008767",
              backgroundColor:
                value == "pending" ? "#FFC5C5" : "rgba(22, 192, 152, .5)",
              color: value == "pending" ? "#DF0404" : "#008767",
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
          {selectedRow && (
            <>
              <Typography id="modal-modal-title" variant="h2">
                Enter Delivery Fee
              </Typography>
              <div>
                <Typography variant="body1">
                  Delivery From: {selectedRow.pickup}
                </Typography>
                <Typography variant="body1">
                  Delivery To: {selectedRow.delivery}
                </Typography>
                <Typography variant="body1">
                  Item Category: {selectedRow.item_category}
                </Typography>
                <Typography variant="body1">
                  Quantity: {selectedRow.unit}
                </Typography>
                {/* Add more fields here based on the selected row */}
              </div>
              <TextField
                variant="outlined"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => {
                        handlePayment(selectedRow.id);
                      }}
                      variant="contained"
                      color="primary"
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1.4rem",
                      }}
                    >
                      {loader ? (
                        <ScaleLoader height={10} color="#ffffff" />
                      ) : (
                        "Send"
                      )}
                    </Button>
                  ),
                }}
              />
            </>
          )}
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
                <Typography variant="h1">
                  {countTotalDeliveries(rows)?.total}
                </Typography>
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  {countTotalDeliveries(rows)?.status === "up" ? (
                    <span style={{ color: "#00AC4F", fontWeight: 700 }}>
                      {" "}
                      <>
                        <ArrowUpward />{" "}
                        {countTotalDeliveries(rows)?.percentChange}%{" "}
                      </>
                      this month
                    </span>
                  ) : (
                    <span style={{ color: "#DF0404", fontWeight: 700 }}>
                      {" "}
                      <>
                        <ArrowDownward />{" "}
                        {countTotalDeliveries(rows)?.percentChange}%{" "}
                      </>
                      this month
                    </span>
                  )}
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
                <Typography variant="h1">
                  {countDeliveriesByStatus(rows, "ready").total}
                </Typography>
                <Typography variant="body1">
                  {countDeliveriesByStatus(rows, "ready")?.status === "up" ? (
                    <span style={{ color: "#00AC4F", fontWeight: 700 }}>
                      {" "}
                      <>
                        <ArrowUpward />{" "}
                        {countDeliveriesByStatus(rows, "ready")?.percentChange}%{" "}
                      </>
                      this month
                    </span>
                  ) : (
                    <span style={{ color: "#DF0404", fontWeight: 700 }}>
                      {" "}
                      <>
                        <ArrowDownward />{" "}
                        {countDeliveriesByStatus(rows, "ready")?.percentChange}%{" "}
                      </>
                      this month
                    </span>
                  )}
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
                <Typography variant="h1">
                  {countDeliveriesByStatus(rows, "delivered").total}
                </Typography>
                <Typography variant="body1">
                  {countDeliveriesByStatus(rows, "delivered")?.status ===
                  "up" ? (
                    <span style={{ color: "#00AC4F", fontWeight: 700 }}>
                      {" "}
                      <>
                        <ArrowUpward />{" "}
                        {
                          countDeliveriesByStatus(rows, "delivered")
                            ?.percentChange
                        }
                        %{" "}
                      </>
                      this month
                    </span>
                  ) : (
                    <span style={{ color: "#DF0404", fontWeight: 700 }}>
                      {" "}
                      <>
                        <ArrowDownward />{" "}
                        {
                          countDeliveriesByStatus(rows, "delivered")
                            ?.percentChange
                        }
                        %{" "}
                      </>
                      this month
                    </span>
                  )}
                </Typography>
              </div>
            </div>
            {/* <div className={classes.eachInfo}>
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
            </div> */}
          </Card>

          <Card className={classes.overviewCard}>
            <DataGrid
              rows={rows}
              columns={columns}
              // onCellClick={(params) => handleOpen(params.row)}
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
