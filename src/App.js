import React from "react"
import './App.css';
import { Redirect, Route } from 'react-router-dom';

import { Login } from './components/Auth/Login.js'
import { Register } from './components/Auth/Register'

export const App = () => (
  <>
    <Route render={() => {
            if (localStorage.getItem("watchparty_id")) {
                return <h1>WatchParty Home</h1>
            } else {
                return <Redirect to="/login" />
            }
        }} />
    <Route path="/login" render={(props) => {
            if (localStorage.getItem("watchparty_id")) {
                return <Redirect to="/" />
            } else {
                return <Login {...props} />
            }
        }} />

    <Route path="/register" render={(props) => {
            if (localStorage.getItem("watchparty_id")) {
                return <Redirect to="/" />
            } else {
                return <Register history={props.history} />
            }
        }} />
  </>
)
