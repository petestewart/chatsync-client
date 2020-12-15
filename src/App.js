import React from "react"
import './App.css';
import { Redirect, Route } from 'react-router-dom';

import { ApplicationViews } from './components/Auth/ApplicationViews'
import { Login } from './components/Auth/Login'
import { NavBar } from './components/Navigation/NavBar'
import { Register } from './components/Auth/Register'

export const App = () => (
  <>
    {/* Main App View */}
    <Route render={(props) => {
            if (localStorage.getItem("watchparty_id")) {
                return (
                    <>
                        <NavBar {...props}/>
                        <ApplicationViews />
                    </>)
            } else {
                return <Redirect to="/login" />
            }
        }} />

    {/* Login Screen */}
    <Route path="/login" render={(props) => {
            if (localStorage.getItem("watchparty_id")) {
                return <Redirect to="/" />
            } else {
                return <Login {...props} />
            }
        }} />

    {/* Register New User */}
    <Route path="/register" render={(props) => {
            if (localStorage.getItem("watchparty_id")) {
                return <Redirect to="/" />
            } else {
                return <Register history={props.history} />
            }
        }} />
  </>
)
