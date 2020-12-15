import React from "react"

import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <div className="d-flex justify-content-between m-2">
            <i class="fas fa-bars fa-2x nav-item"></i>
            <i class="fas fa-home fa-2x nav-item"></i>
            <i class="fas fa-bell fa-2x nav-item"></i>
            <i class="fas fa-user-circle fa-2x nav-item" onClick={() => props.history.push("/profile")}></i>
        </div>
    )
};