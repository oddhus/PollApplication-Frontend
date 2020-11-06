import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUser from "../queries/use-user";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedOut } = useUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loggedOut) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
