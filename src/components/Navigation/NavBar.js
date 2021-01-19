import React, { useState, useEffect, useContext } from "react"

import { FirebaseContext } from "../Firebase/FirebaseProvider"

import "./NavBar.css"

import { NotificationsWindow } from '../UI/Notifications/NotificationsWindow'

export const NavBar = (props) => {
    // notifications data and functions
    const { deleteNotification, markAllNotificationsRead, notifications, unreadWarning } = useContext(FirebaseContext)
    const [showNotifications, setShowNotifications] = useState(false)

    return (
        <>
            <div className="nav-bar d-flex justify-content-between p-2">
                {/* menu button */}
                <i className={`fas fa-bars fa-2x nav-item ${props.sideDrawerOpen ? 'nav-item-active' : ''}`} onClick={props.toggleSideDrawerHandler}></i>

                {/* notifications button with unread indicator */}
                <i className="fas fa-home fa-2x nav-item" onClick={() => props.history.push("/")}></i>
                <div className="notification-bell">
                    <i className="fas fa-bell fa-2x nav-item" 
                        onClick={
                            () => {
                                if (showNotifications) {
                                    markAllNotificationsRead()
                                }
                                setShowNotifications(!showNotifications)
                            }
                    }>
                        {
                            unreadWarning
                            ? <span className="notification-dot">🔴</span>
                            : ''
                        }
                    </i>
                    
                </div>

                {/* user profile button */}
                <i className="fas fa-user-circle fa-2x nav-item" onClick={() => props.history.push("/profile")}></i>
            </div>
            
            {/* open notifications window if selected */}
            {
                showNotifications
                ? <NotificationsWindow 
                    {...props}
                    notifications={notifications.sort((a,b) => (a.createdAt.seconds < b.createdAt.seconds) ? 1 : -1)}  
                    setShowNotifications={setShowNotifications} 
                    markAllNotificationsRead={markAllNotificationsRead}
                    deleteNotification={deleteNotification} 
                    />
                : ''
            }
        </>
    )
};
