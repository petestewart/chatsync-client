import React, { useContext } from "react"

import { AuthContext } from "../Auth/AuthProvider"

import Backdrop from '../UI/Backdrop/Backdrop';

import "./SideDrawer.css"

export const SideDrawer = (props) => {
    const {logoutUser} = useContext(AuthContext)

    return (
        <>
        <Backdrop show={props.open} clicked={props.closedHandler} />
        <div className={`sidedrawer ${props.open ? 'sidedrawer-open' : 'sidedrawer-closed'}`}>
            <ul className="side-menu w-100">
                <li className="sidemenu-item my-3" onClick={() => {
                    props.closedHandler()
                    props.history.push("/parties/upcoming")
                    }}>
                    <span className="menu-icon"><i className="fas fa-calendar-alt"></i></span>My Parties
                </li>
                <li className="sidemenu-item my-3" onClick={() => {
                    props.closedHandler()
                    props.history.push("/parties/create")
                    }}>
                    <span className="menu-icon"><i className="fas fa-calendar-plus"></i></span>Schedule Party
                </li>
                <li className="sidemenu-item my-3">
                    <span className="menu-icon"><i className="fas fa-comments"></i></span>Host Instant Party
                </li>
                <hr />
                <li className="my-3"><span className="menu-icon"><i className="fas fa-hashtag"></i></span>My Channels</li>
                <li className="sidemenu-item my-3" onClick={() => {
                    props.closedHandler()
                    props.history.push("/channels/create")
                    }}>
                    <span className="menu-icon"><i className="fas fa-users"></i></span>Create Channel
                </li>
                <hr />
                <li className="sidemenu-item my-3">
                    <span className="menu-icon"><i className="fas fa-user-plus"></i></span>Invite Friends
                </li>
                <li className="sidemenu-item my-3" onClick={logoutUser}>
                    <span className="menu-icon"><i className="fas fa-sign-out-alt" ></i></span>Sign Out
                </li>
            </ul>
        </div>
        </>
    )
}

