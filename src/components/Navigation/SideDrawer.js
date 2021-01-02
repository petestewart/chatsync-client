import React, { useContext, useState, useEffect } from "react"

import { AuthContext } from "../Auth/AuthProvider"

import Backdrop from '../UI/Backdrop/Backdrop';

import "./SideDrawer.css"

export const SideDrawer = (props) => {
    const {logoutUser} = useContext(AuthContext)

    const [sortedChannels, setSortedChannels] = useState([])

    useEffect(() => {
        if (props.userChannels) {
            const channelList = [...props.userChannels]
            channelList.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
            setSortedChannels(channelList)
        }
    }, [props.userChannels])

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
                {
                    props.userChannels
                    ?   sortedChannels.map((channel) => <li className="sidemenu-item my-3" key={channel.id} onClick={() => {
                        props.closedHandler()
                        props.history.push(`/channels/${channel.id}`)
                        }}><span className="menu-icon"><i className="fas"></i></span>#{channel.name}</li>)
                        // props.userChannels.map((channel) => <li className="my-3" key={channel.id}><span className="menu-icon"><i className="fas"></i></span>#{channel.name}</li>)
                    
                    : ''
                }
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

