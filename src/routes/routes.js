import React from "react";
import { Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { UserPollsPage } from "../pages/UserPollsPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CreateEditPollPage } from "../pages/CreateEditPollPage";
import { AccountPage } from "../pages/AccountPage";
import { AdminPage } from "../pages/AdminPage";
import { PublicPollsPage } from "../pages/PublicPollsPage";
import { VotePage } from "../pages/VotePage";

export const UnauthenticatedAppRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/vote/:pollId" component={VotePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </React.Fragment>
  );
};

export const AuthenticatedAppRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/polls" component={UserPollsPage} />
      <Route path="/polls/:pollId" component={CreateEditPollPage} />
      <Route path="/vote/:pollId" component={VotePage} />
      <Route path="/create" component={CreateEditPollPage} />
      <Route path="/public" component={PublicPollsPage} />
      <Route path="/account" component={AccountPage} />
    </React.Fragment>
  );
};

export const AdminAppRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/admin" component={AdminPage} />
    </React.Fragment>
  );
};
