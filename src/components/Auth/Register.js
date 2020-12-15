import React, { useState, useEffect } from "react"

import './Auth.css'


export const Register = props => {

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [passwordMatches, setPasswordMatches] = useState(true)
    const [formIsComplete, setFormIsComplete] = useState(false)
    const [termsAgreed, setTermsAgreed] = useState(false)

    const confirmPassword = () => {
        if (signupInfo.passwordConfirm === signupInfo.password) {
            setPasswordMatches(true)
        } else {
            setPasswordMatches(false)
        }
    }
    
    useEffect(() => {
        setPasswordMatches(signupInfo.password === signupInfo.passwordConfirm)
    }, [signupInfo])

    useEffect(() => {
        const formCopy = { ...signupInfo }
        setFormIsComplete(!Object.values(formCopy).includes(''))
    }, [signupInfo])

    const handleTermsCheckbox = (e) => {
        setTermsAgreed(e.target.checked)
    };

    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...signupInfo }
        formInfo[e.target.id] = e.target.value
        setSignupInfo(formInfo)
        };

    const handleFormSubmission = (e) => {
        e.preventDefault()
        if (!passwordMatches || !formIsComplete) { return }
        return fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: signupInfo.username,
                password: signupInfo.password,
                email: signupInfo.email
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem('watchparty_token', res.token)
                    props.history.push("/")
                }
                else {
                    console.warn('invalid')
                }
            })
    };



    return (
        <main className="register-container px-3">
        <h1 className="watchparty-logo mt-3 text-center">WatchParty</h1>
            <section>

            <form className="signup-form my-5" onSubmit={handleFormSubmission}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={handleFormInput} type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                </div>

                <div className="form-group mb-5">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleFormInput} type="email" id="email" className="form-control" placeholder="Email address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input onChange={handleFormInput} type="password" id="password" className="form-control" placeholder="Password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password </label>
                    <input onChange={handleFormInput} type="password" id="passwordConfirm" className="form-control" placeholder="Password" required />
                    <small class="text-danger mt-3" role="alert">
                    { signupInfo.passwordConfirm && !passwordMatches ? 'Passwords do not match' : ''}
                    </small>
                </div>
                <div class="form-group form-check d-flex align-items-center mb-5">
                    <input onChange={handleTermsCheckbox} type="checkbox" class="form-check-input" id="terms" checked={termsAgreed}/>
                    <label class="form-check-label" for="terms"><small>Terms and conditions</small></label>
                </div>
                <button className="btn btn-success w-100" onClick={handleFormSubmission} disabled={!formIsComplete || !passwordMatches || !termsAgreed} >Create Account</button>
            </form>
        </section>
    </main>
    )
}