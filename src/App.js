import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Container } from "@material-ui/core";
import {
  AdminAppRoutes,
  AuthenticatedAppRoutes,
  UnauthenticatedAppRoutes,
} from "./routes/routes";
import useUser from "./data/use-user";

export const App = () => {
  const { loggedOut, user } = useUser();

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth={"md"}>
        <Switch>
          {!loggedOut ? (
            <AuthenticatedAppRoutes />
          ) : (
            <UnauthenticatedAppRoutes />
          )}
        </Switch>
        <Switch>{user && user.admin ? <AdminAppRoutes /> : null}</Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
