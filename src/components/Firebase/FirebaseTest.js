import React, { useState, useContext, useRef, useEffect } from 'react'

import { FirebaseContext } from "../Firebase/FirebaseProvider"

export const FirebaseTest = props => {

    const { sendNotification, createNotification, deleteNotification, markAllNotificationsRead, markNotificationRead, notifications, unreadWarning, setUnreadWarning } = useContext(FirebaseContext)

    return (
        <div>

            {
                notifications
                ? notifications.map(n => <p key={n.id} className={`${n.isRead ? '' : 'text-danger'}`}>{n.content}</p>)
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

            <button onClick={() => {sendNotification({content: 'Hello There!', link: '/'}, 6)}}>Send Bernie Notification</button>
            <p></p>

            <button onClick={() => {createNotification({content: 'Test Notification', link: '/'})}}>Create Notification</button>
            <p></p>

            <button onClick={() => {markNotificationRead(notifications[0].id)}}>Read Notification</button>
            <p></p>

            <button onClick={() => {deleteNotification(notifications[0].id)}}>Delete Notification</button>
            <p></p>

            <button onClick={() => {markAllNotificationsRead()}}>Mark All Read</button>
            <p></p>

            <button onClick={() => {setUnreadWarning(!unreadWarning)}}>Set Warning</button>
        </div>
    )
}