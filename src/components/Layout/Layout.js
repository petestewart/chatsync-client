import React, { useState } from "react"

import { ApplicationViews } from '../ApplicationViews'
import { NavBar } from '../Navigation/NavBar'
import { SideDrawer } from "../Navigation/SideDrawer"

import "./Layout.css"


export const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    };

    return (
        <div className="Layout">
            <div className="navbar-container">
            <NavBar toggleSideDrawerHandler={sideDrawerToggleHandler} sideDrawerOpen={showSideDrawer} {...props}/>
            </div>
            <div className="app-container">
            <SideDrawer open={showSideDrawer} closedHandler={sideDrawerClosedHandler} {...props} />
            <ApplicationViews sideDrawerOpen={showSideDrawer} closeSideDrawer={sideDrawerClosedHandler}  {...props}/>

            </div>
        </div>
    )
};
