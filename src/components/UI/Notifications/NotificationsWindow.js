import React, { useState } from "react"

import "./NotificationsWindow.css"

export const NotificationsWindow = (props) => {



    return ( 
        <>
        { props.notifications.length > 0
            ?    <div className="notifications-window">
                    {props.notifications.slice(0, 7).map((n) => 
                    <div 
                        className='notification d-flex justify-content-between align-items-center' 
                        key={n.id}
                        onClick={() => {
                            props.setShowNotifications(false)
                            props.markAllNotificationsRead()
                            if (n.link) {
                                props.history.push(n.link)
                            }
                        }}
                        >
                        <small className={`${n.isRead ? '' : 'font-weight-bold'}`}>
                            {n.content}
                        </small>
                            <span className="mr-1 delete-notification-button text-secondary" 
                                aria-hidden="true"
                                id={n}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    props.deleteNotification(n.id)}}>
                                    &times;
                            </span>
                    </div>)}
                </div>
            : ''
            }
</>
    )
}

