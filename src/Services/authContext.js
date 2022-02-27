import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext()

function AuthContextProvider(props) {
    const [ user, setUser ] = useState(undefined);

    async function getLoggedIn() {
        const loggedIn = await axios.get('http://localhost:3001/user/login');
        setUser(loggedIn.data)
    }

    useEffect(() => {
        getLoggedIn()
    }, []);

    return (
    <AuthContext.Provider value={{user, getLoggedIn}}>
        {props.children}
    </AuthContext.Provider>
    );
}

export default AuthContext
export {AuthContextProvider}