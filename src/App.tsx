import React, { Fragment } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { UnAuthenicatedApp } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
import AuthenicatedApp from "pages/authenicated-app";

function App() {
  const { user } = useAuth();

  return (
    <Fragment>
      <div className="container">
        {user ? (
          <AuthenicatedApp></AuthenicatedApp>
        ) : (
          <UnAuthenicatedApp></UnAuthenicatedApp>
        )}
      </div>
    </Fragment>
  );
}

export default App;
