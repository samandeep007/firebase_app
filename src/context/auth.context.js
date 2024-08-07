import { createContext, useContext } from "react";

const authContext = createContext({
    name: "",
    email: "",
    password: "",
    isLoggedIn: false
})

export const useAuth = () => useContext(authContext);
export const authProvider = Provider.authContext