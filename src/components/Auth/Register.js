import React, { useContext, useState, useEffect } from "react"

import { AuthContext } from "./AuthProvider"

import './Auth.css'


export const Register = props => {
    const {registerUser} = useContext(AuthContext)


    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [passwordMatches, setPasswordMatches] = useState(true)
    const [formIsComplete, setFormIsComplete] = useState(false)
    const [termsAgreed, setTermsAgreed] = useState(false)

    // const confirmPassword = () => {
    //     if (signupInfo.passwordConfirm === signupInfo.password) {
    //         setPasswordMatches(true)
    //     } else {
    //         setPasswordMatches(false)
    //     }
    // }
    
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
        registerUser({
            username: signupInfo.username,
            password: signupInfo.password,
            email: signupInfo.email
        })
    };

    return (
        <main className="register-container px-3">
        <h1 className="watchparty-logo mt-3 text-center text-warning">ChatSync</h1>
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
                    <small className="text-danger mt-3" role="alert">
                    { signupInfo.passwordConfirm && !passwordMatches ? 'Passwords do not match' : ''}
                    </small>
                </div>
                <div className="form-group form-check d-flex align-items-center mb-5">
                    <input onChange={handleTermsCheckbox} type="checkbox" className="form-check-input" id="terms" checked={termsAgreed}/>
                    <label className="form-check-label" htmlFor="terms"><small>Terms and conditions</small></label>
                </div>
                <button className="btn btn-success w-100" onClick={handleFormSubmission} disabled={!formIsComplete || !passwordMatches || !termsAgreed} >Create Account</button>
            </form>
        </section>
    </main>
    )
}