import React, { useContext } from "react"

export const Login = props => {

    const username = React.createRef()
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
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem('watchparty_id', res.token)
                    props.history.push("/")
                }
                else {
                    console.warn('invalid')
                }
            })
    }

    return (
        <main className="login-container">
            <h1>WatchParty</h1>
            <section>
                <form className="login-form" onSubmit={handleLogin}>
                    <fieldset>
                        <label htmlFor="username">Username</label>
                        <input ref={username} type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset>
                        <button className="btn btn-success">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section>
                    <fieldset>
                <h6>No account? No problem.</h6>
                <button className="btn btn-secondary" onClick={() => props.history.push("/register")}>Sign Up</button>
                    </fieldset>
            </section>
        </main>

    )
}