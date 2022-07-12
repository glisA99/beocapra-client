import React, { useContext } from 'react';
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

    // if user is already loged-in
    if (appContext.user) {
        navigate("/");
    } else {
        var user_data = localStorage.getItem(USER_DATA);
        if (!user_data) user_data = sessionStorage.getItem(USER_DATA);
        // if user has active session or saved token in local storage
        if (user_data) {
            const data: UserData = JSON.parse(user_data);
            appDispatch.loginUser({ username: data.username });
            navigate("/");
        }
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )

}