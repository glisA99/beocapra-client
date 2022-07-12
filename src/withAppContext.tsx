import React, { useState,useCallback } from 'react';
import { User } from './types/User';
import { WithChildren } from './types/utils';

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
const AppContext = React.createContext<ApplicationContext>({});
AppContext.displayName = "APPLICATION_CONTEXT";
// to mutate the context state
const AppContextDispatch = React.createContext<ApplicationDispatchContext>({} as any);
AppContextDispatch.displayName = "APPLICATION_DISPATCH_CONTEXT";

type WithAppContextProps = WithChildren & {
    initValue?: { context: ApplicationContext }
}

export const withAppContext = ({ children,initValue }: WithAppContextProps) => {
    
    const [state,setState] = useState<{ context: ApplicationContext }>(initValue || {
        context: {}
    });
    const [dispatchState,setDispatchState] = useState<{ context: ApplicationDispatchContext }>({} as any);

    // on mount -> set functions that mutate state
    React.useEffect(() => {
        setDispatchState({
            context: { loginUser, logoutUser }
        });
    }, []);

    const loginUser = useCallback<LoginUserFn>(user => {
        if (state.context.user) return;
        setState(prevState => ({ context: { ...prevState.context, user } }));
    },[])

    const logoutUser = useCallback<LogoutFn>(() => {
        if (!state.context.user) return;
        setState(prevState => ({ context: { ...prevState.context, user: undefined } }));
    }, []);

    return (
        <AppContext.Provider value={state.context}>
            <AppContextDispatch.Provider value={dispatchState.context}>
                {children}
            </AppContextDispatch.Provider>
        </AppContext.Provider>
    )
}