import React, { useState, useCallback, useEffect } from 'react';
import { User } from '../types/model';
import { WithChildren } from '../types/utils';

type LoginUserFn = (user: User) => void
type LogoutFn = () => void

type ApplicationContext = {
    user?: User
}
type ApplicationDispatchContext = {
    loginUser: LoginUserFn,
    logoutUser: LogoutFn
}

// to query the context state
export const AppContext = React.createContext<ApplicationContext>({});
AppContext.displayName = "APPLICATION_CONTEXT";
// to mutate the context state
export const AppContextDispatch = React.createContext<ApplicationDispatchContext>({} as any);
AppContextDispatch.displayName = "APPLICATION_DISPATCH_CONTEXT";

type WithAppContextProps = WithChildren & {
    initValue?: { context: ApplicationContext }
}

export const WithAppContext = ({ children,initValue = { context: {} } }: WithAppContextProps) => {
    
    const [state,setState] = useState<{ context: ApplicationContext }>(initValue);
    const [dispatchState,setDispatchState] = useState<{ context: ApplicationDispatchContext }>({} as any);

    const loginUser = useCallback<LoginUserFn>(user => {
        if (state.context.user) return;
        setState(prevState => ({ context: { ...prevState.context, user } }));
    },[])

    const logoutUser = useCallback<LogoutFn>(() => {
        setState(prevState => ({ context: { ...prevState.context, user: undefined } }));
    }, []);

    if (!dispatchState.context) {
        setDispatchState({
            context: { loginUser, logoutUser }
        });
    }

    return (
        <AppContext.Provider value={state.context}>
            <AppContextDispatch.Provider value={dispatchState.context}>
                {children}
            </AppContextDispatch.Provider>
        </AppContext.Provider>
    )
}