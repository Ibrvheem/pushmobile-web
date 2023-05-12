import { Card, Container, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Histogram from "../components/Histogram";
import Pie from "../components/Pie";

function Dashboard(props) {
  const [data, setData] = useState([])

  const getHistogram = (data) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const values = new Array(12).fill(0);
  
    // loop through the data array and count the occurrences of each month
    data.forEach((datum) => {
      const month = new Date(datum.created_at).toLocaleString('default', { month: 'short' });
      const index = months.indexOf(month);
      if (index !== -1) {
        values[index]++;
      }
    });
  
    return { labels: months, values };
  };
    
  const getOrderDistributionByItem = (data)=>{
    let categoryCounts = {};
    let backgroundColor = [];
    let labels = [];
    let values = [];
  
    // Count the number of occurrences of each category
    for (let i = 0; i < data.length; i++) {
      const itemCategory = data[i].item_category;
      if (categoryCounts[itemCategory]) {
        categoryCounts[itemCategory]++;
      } else {
        categoryCounts[itemCategory] = 1;
      }
    }
  
    // Create arrays for labels, values, and backgroundColors
    const categoryKeys = Object.keys(categoryCounts);
    for (let i = 0; i < categoryKeys.length; i++) {
      labels.push(categoryKeys[i]);
      values.push(categoryCounts[categoryKeys[i]]);
      // Generate a random backgroundColor for each category
      backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, .5)`);
    }
  
    return {labels, values, backgroundColor};
  }


  // const getRevenueDistributionByItem = (data)=>{
  //     // data = [{"created_at": "2023-05-12T18:28:26.371063","delivery": "Kaduna","delivery_bus_stop": "1","delivery_name": "Tariq Muhammad","delivery_phone_number": "08033788321","fees": 2333.0,"id": 79,"item": null,"item_category": "Food","item_type": "Big","payment_option": "737","payment_reference": "m4b7si1fkc0hlgs","payment_status": "paid","pickup": "Kaduna","pickup_bus_stop": "Kawo","pickup_name": "Tariq Muhammad","pickup_phone_number": "+2348033788321","previous": "select_payment_option","stage": "complete","status": "transit","unit": "2","updated_at": "2023-05-12T18:29:22.507467","vehicle": "Car"}]
  //     // labels = ['Food', 'Document', ....]
  //     // values = [2500, 1500, ....]
  //     // backgroundColor = ["rgba(255, 91, 91, 1)", "rgba(255, 91, 92, .5)", "rgba(255, 92, 93, .5)", ....]
  //     // write code to fetch labels, values and random backgroundColor from the data array
  //     return {labels, values, backgroundColor}
  //   }

  const getRevenueDistributionByItem = (data) => {
    const revenueByCategory = {};
    data.forEach((item) => {
      const category = item.item_category;
      if (revenueByCategory[category]) {
        revenueByCategory[category] += item.fees;
      } else {
        revenueByCategory[category] = item.fees;
      }
    });
  
    const labels = Object.keys(revenueByCategory);
    const values = Object.values(revenueByCategory);
    const backgroundColor = labels.map(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    });
  
    return { labels, values, backgroundColor };
  };
  

  const getCustomerDistribution = (data) => {
    const labelFinder = {
      'MTN': ['+234803', '+234703', '+234806', '+234706', '+234813'],
      'Airtel': ['+234802', '+234702', '+234808', '+234708', '+234812'],
      'Glo': ['+234805', '+234705', '+234815'],
      '9Mobile': ['+234809', '+234709', '+234819']
    };
    const labels = Object.keys(labelFinder);
    const backgroundColor = ["rgba(255, 91, 91, 1)", "rgba(255, 91, 92, .5)", "rgba(255, 92, 93, .5)"];
    const count = {};
    data.forEach((item) => {
      const phoneNumber = item.pickup_phone_number;
      const network = Object.keys(labelFinder).find((key) => labelFinder[key].some((prefix) => phoneNumber.startsWith(prefix)));
      if (network) {
        count[network] = count[network] ? count[network] + 1 : 1;
      }
    });
    const values = labels.map((label) => count[label] || 0);
    const backgroundColors = backgroundColor.slice(0, labels.length).map((color) => color.replace(/(\d+\.\d*)\)/, '0.5)'));
    return { labels, values, backgroundColor: backgroundColors };
  };
  
  

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

  useEffect(() => {
    fetch("https://42f0-102-91-47-135.ngrok-free.app/deliveries", {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM5OTkyOTUsImlhdCI6MTY4MzkxOTU5Mywic3ViIjoyLCJyb2xlIjoiYWRtaW4ifQ.pOgfNurI8Dmi5HAjqAS5gCcIVGmkBcbD2w228bc1kys",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
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
        <Pie data={getOrderDistributionByItem(data)} title='Order Category Distribution' label='Orders'/>
        <Pie data={getCustomerDistribution(data)} title='Customer Distribution' label='Orders' />
        <Pie data={getRevenueDistributionByItem(data)} title='Revenue Distribution' label='Revenue' />
      </Card>
      <Card
        style={{
          width: "95%",
          height: "300px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Histogram data={getHistogram(data)} title='Monthly Deliveries'/>
      </Card>
    </Container>
  );
}

export default Dashboard;
