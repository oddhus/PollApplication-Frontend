import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUser from "../queries/use-user";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { loggedOut, user } = useUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loggedOut && user.admin) {
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

export default AdminRoute;
