import { Card, Container, Typography } from "@material-ui/core";
import React from "react";
import Histogram from "../components/Histogram";
import Pie from "../components/Pie";

function Dashboard(props) {
  const histogramData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    values: [10, 20, 30, 40, 20, 30, 60, 20, 40, 50, 20, 10],
  };

  const totalOrder = {
    text: "Total Order",
    labels: ["Progress", "Reminder"],
    values: [50, 20],
    backgroundColor: ["rgba(255, 91, 91, 1)", "rgba(255, 91, 91, .5)"],
  };
  const customerGrowth = {
    text: "Customer Growth",
    labels: ["Progress", "Reminder"],
    values: [50, 60],
    backgroundColor: ["rgba(0, 176, 116, 1)", "rgba(0, 176, 116, .5)"],
  };
  const totalRevenue = {
    text: "Total Revenue",
    labels: ["Progress", "Reminder"],
    values: [90, 10],
    backgroundColor: ["rgba(45, 156, 219, 1)", "rgba(45, 156, 219, .5)"],
  };
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "8rem",
      }}
    >
      <Card
        elevation={4}
        style={{
          width: "95%",
          height: "300px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pie data={totalOrder} />
        <Pie data={customerGrowth} />
        <Pie data={totalRevenue} />
      </Card>
      <Card
        style={{
          width: "95%",
          height: "300px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Histogram data={histogramData} />
      </Card>
    </Container>
  );
}

export default Dashboard;
