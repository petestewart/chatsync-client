import React from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const logoutUser = () => {
        localStorage.removeItem("watchparty_token")
        props.history.push("/")
    }

    return (
        <AuthContext.Provider value={{logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
};