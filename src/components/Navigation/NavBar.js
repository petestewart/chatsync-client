import React, { useState, useEffect, useContext } from "react"
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'

// import { firebaseInfo } from "../ChatRoom/ChatProvider"
// import { ProfileContext } from "../Profile/ProfileProvider"

import "./NavBar.css"

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseInfo);
// } else {
//     firebase.app(); // if already initialized, use that one
// }

// const firestore = firebase.firestore()

export const NavBar = (props) => {
    // const { profile } = useContext(ProfileContext)

    // const [unreadWarning, setUnreadWarning] = useState(true)

    // // get notifications
    // const notificationsRef = firestore.collection(`notifications-${profile.id}`);
    // const query = notificationsRef.orderBy('createdAt');

    // // listen for new notifications
    // const [notifications] = useCollectionData(query, {idField: 'id'});

    // const saveNotification = async(n) => {
    //     await notificationsRef.add({
    //     content: n.content,
    //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //     isRead: false,
    //     });
    // }

    return (
        <>
            <div className="nav-bar d-flex justify-content-between p-2">
                <i className={`fas fa-bars fa-2x nav-item ${props.sideDrawerOpen ? 'nav-item-active' : ''}`} onClick={props.toggleSideDrawerHandler}></i>
                <i className="fas fa-home fa-2x nav-item" onClick={() => props.history.push("/")}></i>
                <div className="notification-bell">
                    <i className="fas fa-bell fa-2x nav-item">
                        {/* {
                            unreadWarning
                            ? <span className="notification-dot">🔴</span>
                            : ''
                        } */}
                    </i>
                </div>
                <i className="fas fa-user-circle fa-2x nav-item" onClick={() => props.history.push("/profile")}></i>
            </div>
        </>
    )
};
