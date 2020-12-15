import React from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const loginUser = (loginInfo) => {
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

    const registerUser = (userInfo) => {
            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem('watchparty_token', res.token)
                        props.history.push("/profile/edit")
                    }
                    else {
                        console.warn('invalid')
                    }
                })
    };

    const logoutUser = () => {
        localStorage.removeItem("watchparty_token")
        props.history.push("/")
    }

    return (
        <AuthContext.Provider value={{loginUser, logoutUser, registerUser}}>
            {props.children}
        </AuthContext.Provider>
    )
};