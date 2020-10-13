import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Container } from "@material-ui/core";
import {
  AdminAppRoutes,
  AuthenticatedAppRoutes,
  UnauthenticatedAppRoutes,
} from "./routes/routes";

export const App = () => {
  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth={"md"}>
        <Switch>
          {isAuthenticated ? (
            <AuthenticatedAppRoutes />
          ) : (
            <UnauthenticatedAppRoutes />
          )}
        </Switch>
        <Switch>{isAdmin ? <AdminAppRoutes /> : null}</Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
