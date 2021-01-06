import React, { useState, useContext, useRef, useEffect } from 'react'

import { FirebaseContext } from "../Firebase/FirebaseProvider"

export const FirebaseTest = props => {

    const { createNotification, markNotificationRead, notifications, unreadWarning, setUnreadWarning } = useContext(FirebaseContext)

    return (
        <div>

            {
                notifications
                ? notifications.map(n => <p className={`${n.isRead ? '' : 'text-danger'}`}>{n.content}</p>)
                : ''
            }
<p></p>
            <strong>
            {
                unreadWarning
                ? 'UNREAD WARNING'
                : 'no warning'
            }
            </strong>
            <p></p>

            <button onClick={() => {createNotification('Test Notification')}}>Create Notification</button>
            <button onClick={() => {markNotificationRead(notifications[0].id)}}>Read Notification</button>
            <button onClick={() => {setUnreadWarning(!unreadWarning)}}>Set Warning</button>
        </div>
    )
}