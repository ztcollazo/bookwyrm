import React from "react";
import { Redirect } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const AuthCallback = () => <Redirect to="/" />;

export default withAuthenticationRequired(AuthCallback);