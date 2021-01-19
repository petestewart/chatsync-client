import React, { useState, useContext, useEffect } from "react"

import { ApplicationViews } from '../ApplicationViews'
import { NavBar } from '../Navigation/NavBar'
import { SideDrawer } from "../Navigation/SideDrawer"

import { ChannelContext } from "../Channel/ChannelProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

import "./Layout.css"


export const Layout = (props) => {
    const { profile, getProfile } = useContext(ProfileContext)
    const { getChannelsByMember } = useContext(ChannelContext)
    
    const [showSideDrawer, setShowSideDrawer] = useState(false)
    const [userChannels, setUserChannels] = useState([])

    // get the user's profile and channels
    useEffect(getProfile, [])
    useEffect(() => {
        if (profile.id) {
            getChannelsByMember(profile.id)
                .then((res) => setUserChannels(res)) 
        }
    }, [showSideDrawer])

    // handlers for the side drawer
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
            <SideDrawer open={showSideDrawer} closedHandler={sideDrawerClosedHandler} {...props} userChannels={userChannels} />
            <ApplicationViews sideDrawerOpen={showSideDrawer} closeSideDrawer={sideDrawerClosedHandler}  {...props}/>

            </div>
        </div>
    )
};
