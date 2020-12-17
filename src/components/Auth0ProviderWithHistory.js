import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

export const Auth0ProviderWithHistory = ({children}) => {
    const domain = "bookwyrm-app.us.auth0.com";
    const clientID = "H02lkN9su5XJeBgzQrprwt9AcJLFeDLk";

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientID}
            redirectUri={!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8888/auth-callback" : "https://bookwyrm.netlify.app/auth-callback"}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory;