import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

export const Auth0ProviderWithHistory = ({children}) => {
    const domain = "bookwyrm-app.us.auth0.com";
    const clientID = "H02lkN9su5XJeBgzQrprwt9AcJLFeDLk";

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.replace(appState?.returnTo || window.location.pathname);
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientID}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory;