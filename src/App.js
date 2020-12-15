import React from "react"
import './App.css';
import { Redirect, Route } from 'react-router-dom';

import { Layout } from './components/Layout/Layout'
import { Login } from './components/Auth/Login'

import { AuthProvider } from './components/Auth/AuthProvider'

import { Register } from './components/Auth/Register'

export const App = () => (
    <>
    {/* Main App View */}

    <Route render={(props) => {
        if (localStorage.getItem("watchparty_token")) {
            return (
                <AuthProvider {...props}>
                    <Layout {...props} />
                </AuthProvider>)
            } else {
                return <Redirect to="/login" />
            }
        }} />

    {/* Login Screen */}
    <Route path="/login" render={(props) => {
            if (localStorage.getItem("watchparty_token")) {
                return <Redirect to="/" />
            } else {
                return <Login {...props} />
            }
        }} />

    {/* Register New User */}
    <Route path="/register" render={(props) => {
            if (localStorage.getItem("watchparty_token")) {
                return <Redirect to="/" />
            } else {
                return <Register history={props.history} />
            }
        }} />
        </>
)
