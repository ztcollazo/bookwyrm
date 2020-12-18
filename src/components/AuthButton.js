import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const AuthButton = (props) => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        isAuthenticated ? 
            <Button className={props.className} variant="outlined" onClick={() => logout({returnTo: window.location.origin})}>Logout</Button> : 
            <Button className={props.className} variant="outlined" onClick={() => loginWithRedirect()}>Login</Button>
    )
}

export default AuthButton;