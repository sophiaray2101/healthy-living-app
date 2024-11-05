import React from "react";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value= {{username, setUsername}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

// makes it so I can access the username from other pages/components