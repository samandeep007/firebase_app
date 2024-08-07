import { createContext, useContext } from "react";

const authContext = createContext({
    user: {},
    isLoggedIn: false,
    login: () => {}
})

export const useAuth = () => useContext(authContext);
export const AuthProvider = authContext.Provider;