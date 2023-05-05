import { Drawer, ThemeProvider, createTheme } from "@material-ui/core";
import "./App.css";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./pages/User";
import Request from "./pages/Request";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00AC4F",
      light: "#D3FFE7",
    },
    secondary: {
      main: "#5932EA",
    },
    danger: {
      main: "#DF0404",
      light: "#FFC5C5",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "4rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.6rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1.4rem",
      fontWeight: 400,
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/">
              <Layout>
                <Switch>
                  <Route exact path="/users" component={User} />
                  <Route exact path="/requests" component={Request} />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
