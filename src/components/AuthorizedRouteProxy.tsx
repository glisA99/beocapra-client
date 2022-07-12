import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithChildren } from '../types/utils';
import { AppContext, AppContextDispatch } from './withAppContext';
import { USER_DATA } from './LoginForm';
import { UserData } from '../api/login';

// path: route where to navigate if this route is restricted
type AuthorizedRouteProps = WithChildren<{
    path: string
}>;

export const AuthorizedRouteProxy = ({ children, path }: AuthorizedRouteProps) => {

    const appContext = useContext(AppContext);
    const appDispatch = useContext(AppContextDispatch);
    const navigate = useNavigate();
    
    if (!appContext.user) {
        var user_data = localStorage.getItem(USER_DATA);
        if (!user_data) user_data = sessionStorage.getItem(USER_DATA);
        // if there is no user data, restict route
        if (!user_data) {
            navigate(path);   
            return;
        }
        const data: UserData = JSON.parse(user_data);
        appDispatch.loginUser({ username: data.username });
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}