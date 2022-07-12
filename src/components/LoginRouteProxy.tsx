import { Backdrop, CircularProgress } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../api/login';
import { WithChildren } from '../types/utils';
import { USER_DATA } from './LoginForm';
import { AppContext, AppContextDispatch } from './withAppContext';

type LoginRouteProps = WithChildren;

export const LoginRouteProxy = ({ children }: LoginRouteProps) => {

    const appContext = useContext(AppContext);
    const appDispatch = useContext(AppContextDispatch);
    const navigate = useNavigate();

    useEffect(() => {
        // if user is already loged-in
        if (appContext.user) {
            console.log("[LOGIN_PROXY]: User is already logged in");
            console.log(`[LOGIN_PROXY]: Navigating to index route`);
            setTimeout(() => navigate("/"),2000);
        } else {
            var user_data = localStorage.getItem(USER_DATA);
            if (!user_data) user_data = sessionStorage.getItem(USER_DATA);
            // if user has active session or saved token in local storage
            if (user_data) {
                console.log("[LOGIN_PROXY]: User has saved access data in storage");
                console.log(`[LOGIN_PROXY]: Navigating to index route`);
                const data: UserData = JSON.parse(user_data);
                appDispatch.loginUser({ username: data.username });
                setTimeout(() => navigate("/"),2000);
            }
        }
    }, [])

    const backdrop = (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            style={{ display: "flex", flexDirection: "column" }}
        >
            <CircularProgress color="inherit" />
            <h1>USER ALREADY LOGGED IN</h1>
            <h2>Please stand by</h2>
            <h2>Redirecting to: /</h2>
        </Backdrop>
    )

    return (
        <React.Fragment>
            {(appContext.user || localStorage.getItem(USER_DATA) || sessionStorage.getItem(USER_DATA)) ?
                <>{backdrop}</> : children
            }
        </React.Fragment>
    )

}