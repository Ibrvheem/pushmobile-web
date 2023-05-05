import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

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
      width: "95rem",
    },
    button: {
      fontSize: "2rem",
      padding: "1rem 0rem",
    },
  };
});
function Login() {
  const classes = useStyles();

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
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Login;
