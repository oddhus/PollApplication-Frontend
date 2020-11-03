import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Container } from "@material-ui/core";
import { AppRoutes } from "./routes/routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth={"md"}>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
};

export default App;
