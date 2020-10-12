import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/theme";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { UserPollsPage } from "./pages/UserPollsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CreateEditPollPage } from "./pages/CreateEditPollPage";
import { AccountPage } from "./pages/AccountPage";
import { AdminPage } from "./pages/AdminPage";
import { PublicPollsPage } from "./pages/PublicPollsPage";

export const App = () => {
  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Switch>
          {isAuthenticated ? (
            <AuthenticatedAppRoutes />
          ) : (
            <UnauthenticatedAppRoutes />
          )}
        </Switch>
        <Switch>{isAdmin ? <AdminAppRoutes /> : null}</Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const UnauthenticatedAppRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </React.Fragment>
  );
};

const AuthenticatedAppRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/polls" component={UserPollsPage} />
      <Route path="/create" component={CreateEditPollPage} />
      <Route path="/polls/:pollId" component={CreateEditPollPage} />
      <Route path="/public" component={PublicPollsPage} />
      <Route path="/account" component={AccountPage} />
    </React.Fragment>
  );
};

const AdminAppRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/admin" component={AdminPage} />
    </React.Fragment>
  );
};

export default App;
