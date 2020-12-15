import React from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const loginUser = (loginInfo) => {
        console.log(loginInfo)
        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem('watchparty_token', res.token)
                    props.history.push("/")
                }
                else {
                    console.warn('invalid')
                }
            })
    }

    const logoutUser = () => {
        localStorage.removeItem("watchparty_token")
        props.history.push("/")
    }

    return (
        <AuthContext.Provider value={{loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
};