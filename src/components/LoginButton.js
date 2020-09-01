import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Auth0Lock } from "auth0-lock";

class LoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.login = React.createRef();
    }

    handleClick() {
        const options = {
            theme: {
                logo: 'https://bookwyrm.netlify.app/logo.png',
                primaryColor: '#FFA500',
                authButtons: {
                    "google": {},
                    "facebook": {}
                }
            }
        };

        const lock = new Auth0Lock(
            process.env.AUTH0_DOMAIN,
            process.env.AUTH0_CLIENT_ID,
            options
        );

        lock.show();
    }

    render(props) {
        const { isAuthenticated } = this.props.auth0;
        
        return !isAuthenticated && (
            <button ref={ this.login } onClick={ this.handleClick } >Login</button>
        );
    }
}

export default withAuth0(LoginButton);