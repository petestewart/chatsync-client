import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import "./ChatRoom.css"

import { ChatMessage } from './ChatMessage'

import { ProfileContext } from "../Profile/ProfileProvider"




firebase.initializeApp({
    apiKey: "AIzaSyALgLboaRpdiz584kKvzJ0qJNd-6SahHA4",
    authDomain: "superchat-fced2.firebaseapp.com",
    databaseURL: "https://superchat-fced2.firebaseio.com",
    projectId: "superchat-fced2",
    storageBucket: "superchat-fced2.appspot.com",
    messagingSenderId: "81562913345",
    appId: "1:81562913345:web:66125db20cee23cd3494c0"
})

const firestore = firebase.firestore()

export const ChatRoom = (props) => {
    const { profile } = useContext(ProfileContext)
  // get messages
    const messagesRef = firestore.collection(`party-${props.party.id}`);
    const query = messagesRef.orderBy('createdAt').limit(25);

    // listen for new messages
    const [messages] = useCollectionData(query, {idField: 'id'});

    // for sending a message
    const [formValue, setFormValue] = useState('');
    const sendMessage = async(e) => {
        e.preventDefault();
        // (to set current user)
        // send message:
        await messagesRef.add({
        content: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        partyId: props.party.id,
        senderId: profile.id,
        full_name: profile.full_name,
        profile_pic: profile.profile_pic
        });
        setFormValue('');
    }
    
    return (
        <div className="chatroom-container">
            <div className="chat-feed">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} readerId={profile.id} />)}
            </div>
            <div className="chat-footer">
                <form className="chat-message-form" onSubmit={sendMessage}>
                    <textarea 
                        className="chat-text-input-window"
                        rows="4"
                        value={formValue}
                        onChange={(e) => {setFormValue(e.target.value)}}/>
                    <button type="submit">Send</button>
                <div className="message-controls">
                </div>
                </form>
            </div>
        </div>
    )
    };

    

    // const ChatMessage = (props) => {
    // const { photoURL, text, uid } = props.message;

    // return (
    //     <div className="message">
    //         <img src={photoURL} alt=""/>
    //         <p>{text}</p>
    //     </div>
    // )
// };
