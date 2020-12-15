import React, { useState } from "react"

import { ApplicationViews } from '../ApplicationViews'
import { NavBar } from '../Navigation/NavBar'
import { SideDrawer } from "../Navigation/SideDrawer"


export const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    };

    return (
        <>
            <NavBar toggleSideDrawerHandler={sideDrawerToggleHandler} sideDrawerOpen={showSideDrawer} {...props}/>
            <SideDrawer open={showSideDrawer} closedHandler={sideDrawerClosedHandler} {...props} />
            <ApplicationViews sideDrawerOpen={showSideDrawer} sideDrawerClosedHandler={sideDrawerClosedHandler}  {...props}/>
        </>
    )
};
