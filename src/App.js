import React from "react"
import './App.css';
import { Redirect, Route } from 'react-router-dom';

import { Layout } from './components/Layout/Layout'
import { Login } from './components/Auth/Login'

import { AuthProvider } from './components/Auth/AuthProvider'
import { ChannelProvider } from './components/Channel/ChannelProvider'
import { FirebaseProvider } from './components/Firebase/FirebaseProvider'
import { PartyProvider } from './components/Party/PartyProvider'
import { ProfileProvider } from './components/Profile/ProfileProvider'

import { Register } from './components/Auth/Register'

export const App = () => (
    <>
    {/* Main App View */}

    <Route render={(props) => {
        if (localStorage.getItem("watchparty_token")) {
            return (
                <AuthProvider {...props}>
                    <ProfileProvider {...props}>
                        <FirebaseProvider {...props}>
                            <ChannelProvider {...props}>
                                <PartyProvider {...props}>
                                    <Layout {...props} />
                                </PartyProvider>
                            </ChannelProvider>
                        </FirebaseProvider>
                    </ProfileProvider>
                </AuthProvider>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

    {/* Login Screen */}
    <Route path="/login" render={(props) => {
            if (localStorage.getItem("watchparty_token")) {
                return <Redirect to="/" />
            } else {
                return (
                    <AuthProvider {...props}>
                        <Login {...props} />
                    </AuthProvider>
                )
            }
        }} />

    {/* Register New User */}
    <Route path="/register" render={(props) => {
            if (localStorage.getItem("watchparty_token")) {
                return <Redirect to="/" />
            } else {
                return (
                    <AuthProvider {...props}>
                        <Register history={props.history} />
                    </AuthProvider>
                )
                
            }
        }} />
        </>
)
