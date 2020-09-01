import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class LoginButton extends React.Component {
    render(props) {
        const { isAuthenticated, LoginWithPopup } = this.props.auth0;

        return !isAuthenticated && (
            <button id="login" onClick={ LoginWithPopup }>Login</button>
        );
    }
}

export default withAuth0(LoginButton);