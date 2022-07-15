import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithChildren } from '../types/utils';
import { AppContext, AppContextDispatch } from './withAppContext';
import { USER_DATA } from './LoginForm';
import { parseJwt, UserData } from '../api/login';
import { Backdrop, CircularProgress } from '@mui/material';

// path: route where to navigate if this route is restricted
type AuthorizedRouteProps = WithChildren<{
    path: string
}>;

export const AuthorizedRouteProxy = ({ children, path }: AuthorizedRouteProps) => {

    const appContext = useContext(AppContext);
    const appDispatch = useContext(AppContextDispatch);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!appContext.user) {
            console.log("[AUTHORIZATION_PROXY]: User is not logged in");
            var user_data = localStorage.getItem(USER_DATA);
            if (!user_data) user_data = sessionStorage.getItem(USER_DATA);
            // if there is no user data, restict route
            if (!user_data) {
                console.log("[AUTHORIZATION_PROXY]: There is no user data in storage");
                console.log(`[AUTHORIZATION_PROXY]: Navigating to ${path}`);
                setTimeout(() => navigate(path),2000);   
                return;
            }
            const data: UserData = JSON.parse(user_data);
            const jwt_parsed = parseJwt(data.tokens.access_token);
            appDispatch.loginUser({ username: data.username, roles: jwt_parsed.roles });
        } 
    }, [])

    const backdrop = (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            style={{ display: "flex", flexDirection: "column" }}
        >
            <CircularProgress color="inherit" />
            <h1>ACCESS DENIED</h1>
            <h2>Please stand by</h2>
            <h2>Redirecting to: {path}</h2>
        </Backdrop>
    )

    return (
        <React.Fragment>
            {!appContext.user ? <>{backdrop}</> : children}
        </React.Fragment>
    )
}

