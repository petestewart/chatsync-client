import React from "react"

import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <>
            <div className="nav-bar d-flex justify-content-between p-2">
                <i className={`fas fa-bars fa-2x nav-item ${props.sideDrawerOpen ? 'nav-item-active' : ''}`} onClick={props.toggleSideDrawerHandler}></i>
                <i className="fas fa-home fa-2x nav-item" onClick={() => props.history.push("/")}></i>
                <i className="fas fa-bell fa-2x nav-item"></i>
                <i className="fas fa-user-circle fa-2x nav-item" onClick={() => props.history.push("/profile")}></i>
            </div>
        </>
    )
};
