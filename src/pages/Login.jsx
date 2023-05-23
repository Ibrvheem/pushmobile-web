import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    login: {
      height: "100vh",
      backgroundColor: "lavender",
    },
    loginContainer: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "3rem",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
    },
    textField: {
      width: "55rem",
    },
    button: {
      fontSize: "2rem",
      padding: "1rem 0rem",
    },
  };
});
function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch(process.env.REACT_APP_API_URL+"/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/dashboard");
        } else {
          alert("wrong credentials");
        }
      });
    });
  }

  return (
    <div className={classes.login}>
      <Container className={classes.loginContainer}>
        <div className={classes.greetings} style={{ textAlign: "center" }}>
          <Typography variant="h1">
            Hello Admin. <br />
            Welcome Back
          </Typography>
        </div>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            color="textSecondary"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            inputProps={{
              style: { fontSize: "2rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "2rem", width: "3rem" },
            }}
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            color="textSecondary"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            inputProps={{
              style: { fontSize: "2rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "2rem", width: "auto" },
            }}
            className={classes.textField}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Login;
