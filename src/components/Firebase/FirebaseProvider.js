import React, { useState, useContext, useRef, useEffect } from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { ProfileContext } from "../Profile/ProfileProvider"

export const FirebaseContext = React.createContext()


export const FirebaseProvider = props => {
    const firebaseInfo = {
        apiKey: "AIzaSyALgLboaRpdiz584kKvzJ0qJNd-6SahHA4",
        authDomain: "superchat-fced2.firebaseapp.com",
        databaseURL: "https://superchat-fced2.firebaseio.com",
        projectId: "superchat-fced2",
        storageBucket: "superchat-fced2.appspot.com",
        messagingSenderId: "81562913345",
        appId: "1:81562913345:web:66125db20cee23cd3494c0"
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseInfo);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const firestore = firebase.firestore()


    const { profile } = useContext(ProfileContext)

    const [unreadWarning, setUnreadWarning] = useState(false)
    
    // get notifications
    const notificationsRef = firestore.collection(`notifications-${profile.id}`);
    const query = notificationsRef.orderBy('createdAt');
    
    // listen for new notifications
    const [notifications] = useCollectionData(query, {idField: 'id'});

    useEffect(() => {
        if (notifications && !notifications.every(n => n.isRead)) {
            setUnreadWarning(true)
        } else {
            setUnreadWarning(false)
        }
    }, [notifications])

    const createNotification = async(n) => {
        await notificationsRef.add({
            content: n.content,
            link: n.link,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isRead: false,
        });
    }

    const sendNotification = async(n, recipientId) => {
        const recipientRef = firestore.collection(`notifications-${recipientId}`)
        recipientRef.add({
            content: n.content,
            link: n.link,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isRead: false,
        });
    }

    const markNotificationRead = async(notificationId) => {
        notificationsRef.doc(notificationId).update({
        isRead: true
        });
    }

    const markAllNotificationsRead = async() => {
        notifications.forEach((n) => {
            markNotificationRead(n.id)
        })
    }

    const deleteNotification = async(notificationId) => {
        notificationsRef.doc(notificationId).delete();
    }

    return (
        <FirebaseContext.Provider value={{firebaseInfo, createNotification, sendNotification, deleteNotification, markAllNotificationsRead, markNotificationRead, notifications, unreadWarning, setUnreadWarning}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
