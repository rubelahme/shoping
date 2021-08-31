import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AllProvider } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loginItem] = useContext(AllProvider);
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          loginItem.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
