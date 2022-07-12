import React from 'react';
import { Radnik } from './types/Radnik';
import { WithChildren } from './types/utils';

type ApplicationContext = {
    user?: Radnik
}
  
const AppContext = React.createContext<ApplicationContext>({});
AppContext.displayName = "APPLICATION_CONTEXT";

type WithAppContextProps = WithChildren & {
    initValue?: ApplicationContext
}

export const withAppContext = ({ children,initValue = {} }: WithAppContextProps) => {

    const [state,setState] = React.useState<ApplicationContext>({});



    return (
        <AppContext.Provider value={{  }}>
            {children}
        </AppContext.Provider>
    )
}