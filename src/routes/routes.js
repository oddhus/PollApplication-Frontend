import React from "react";
import { Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { UserPollsPage } from "../pages/UserPollsPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AccountPage } from "../pages/AccountPage";
import { PublicPollsPage } from "../pages/PublicPollsPage";
import { GuestLoginPage } from "../pages/GuestLoginPage";
import { VotePage } from "../pages/VotePage";
import { ResultPage } from "../pages/ResultPage";
import { NoMatch } from "../pages/NoMatch";
import { Switch } from "react-router-dom";
import CreateEditPollPage from "../pages/CreateEditPollPage";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route path="/guest" component={GuestLoginPage} />
        <Route path="/vote/:pollId" component={VotePage} />
        <Route path="/result/:pollId" component={ResultPage} />
        <Route path="/public" component={PublicPollsPage} />
        <ProtectedRoute exact path="/polls" component={UserPollsPage} />
        <ProtectedRoute path="/polls/:pollId" component={CreateEditPollPage} />
        <ProtectedRoute path="/create" component={CreateEditPollPage} />
        <ProtectedRoute path="/account" component={AccountPage} />
        <AdminRoute path="/admin" component={AdminPage} />
        <Route component={NoMatch} />
      </Switch>
    </React.Fragment>
  );
};
