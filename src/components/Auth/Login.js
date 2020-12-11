import React, { useContext } from "react"
import { Link } from "react-router-dom"

export const Login = props => {

    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()

    const handleLogin = (e) => {
        e.preventDefault()
        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "isActive" in res && "token" in res) {
                    localStorage.setItem('watchparty_id', res.token)
                    props.history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="login-container">
            <h1>WatchParty</h1>
            <section>
                <form className="login-form" onSubmit={handleLogin}>
                    <fieldset>
                        <label htmlFor="email">Email address </label>
                        <input ref={email} type="email" id="email" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="password"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                        <button className="btn btn-success">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section>
                <h6>No account? No problem.</h6>
                <button className="btn btn-secondary" onClick={() => props.history.push("/register")}>Sign Up</button>
            </section>
        </main>

    )
}