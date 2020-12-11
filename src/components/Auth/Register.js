import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Register = props => {

    const [signupInfo, setSignupInfo] = useState({
        fullName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [passwordMatch, setPasswordMatch] = useState(true)
    // const [passwordWarning, setPasswordWarning] = useState(true)

    const confirmPassword = () => {
        if (signupInfo.passwordConfirm === signupInfo.password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }
    
    useEffect(() => {
        setPasswordMatch(signupInfo.password === signupInfo.passwordConfirm)
    }, [signupInfo])

    // useEffect(() => {
    //     if (signupInfo.passwordConfirm !== '') {
    //         setPasswordWarning(passwordMatch)
    //     } else setPasswordWarning(false)
    // }, [signupInfo.password, signupInfo.passwordConfirm])

    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...signupInfo }
        formInfo[e.target.id] = e.target.value
        setSignupInfo(formInfo)};

    return (
        <main className="register-container">
        <h1>WatchParty</h1>
        <section>
            <form className="login-form" onSubmit={handleFormInput}>
                <fieldset>
                    <label htmlFor="email">Full Name</label>
                    <input onChange={handleFormInput} type="text" id="fullName" className="form-control" placeholder="Full name" required autoFocus />
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleFormInput} type="email" id="email" className="form-control" placeholder="Email address" required />
                    <label htmlFor="password">Password </label>
                    <input onChange={handleFormInput} type="password" id="password" className="form-control" placeholder="Password" required />
                    <label htmlFor="passwordConfirm">Confirm Password </label>
                    <input onChange={handleFormInput} type="password" id="passwordConfirm" className="form-control" placeholder="Confirm Password" required />
                    <button className="btn btn-success">Create Account</button>
                    { signupInfo.passwordConfirm && !passwordMatch ? 'PASSWORDS DO NOT MATCH' : ''}
                </fieldset>
            </form>
        </section>
        <section>
            <button className="btn btn-secondary" onClick={() => props.history.push("/register")}>Sign Up</button>
        </section>
    </main>
    )
}