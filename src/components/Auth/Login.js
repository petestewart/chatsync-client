import React, { useContext } from "react"

import { AuthContext } from "./AuthProvider"


import './Auth.css'

export const Login = props => {
    const {loginUser} = useContext(AuthContext)


    const username = React.createRef()
    const password = React.createRef()
    // const invalidDialog = React.createRef()

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser({
            username: username.current.value,
            password: password.current.value
        })
    };


    return (
        <main className="login-container px-3">
            <h1 className="watchparty-logo mt-3 text-center">ChatSync</h1>
            <section>

            <form className="login-form my-5" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input ref={username} type="text" className="form-control" id="username" placeholder="Enter username" />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input ref={password} type="password" className="form-control" id="password" placeholder="Enter password" />
                </div>
                <button className="btn btn-success w-100">Sign In</button>
            </form>

            </section>
            <section className="signup-button my-5">
            <div className="form-group">
                <small className="form-text text-center">No account? No problem.</small>
                <button className="btn btn-secondary w-100" onClick={() => props.history.push("/register")}>Sign Up</button>
            </div>
            </section>
        </main>

    )
}