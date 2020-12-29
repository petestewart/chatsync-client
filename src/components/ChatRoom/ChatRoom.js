import React, { useState, useContext, useRef, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import "./ChatRoom.css"

import { ChatCalibrator } from "./ChatCalibrator"
import { ChatMessage } from './ChatMessage'

import { firebaseInfo } from "./ChatProvider"
import { ChatContext } from "./ChatProvider"
import { ProfileContext } from "../Profile/ProfileProvider"


firebase.initializeApp(firebaseInfo)

const firestore = firebase.firestore()

export const ChatRoom = (props) => {
    const endOfFeed = useRef();
    const [calibrationMessage, setCalibrationMessage] = useState({})


    const { profile } = useContext(ProfileContext)

    const { getAllReactionTypes, reactionTypes } = useContext(ChatContext)

    useEffect(getAllReactionTypes, [])

    // get messages
    const messagesRef = firestore.collection(`party-${props.party.id}`);
    const query = messagesRef.orderBy('createdAt').limit(25);

    // listen for new messages
    const [messages] = useCollectionData(query, {idField: 'id'});

    // *** CHECK FOR SYSTEM MESSAGES ***
    useEffect(() => {
        if (messages) {
            let calibratorOpen = false
            let calibrateMessage = null

            messages.forEach((m) => {
                if (m.systemMessage) {
                    if (m.messageType === 'calibration_call') {
                        if (calibrateMessage) {
                            if (m.id !== calibrateMessage.id) {
                                // delete old message (calibrateMessage.id)
                                deleteMessage(calibrateMessage.id)
                            }
                        }
                        calibrateMessage = m
                        calibratorOpen = true
                        console.log(calibrateMessage)
                    }
                    if (m.messageType === 'calibration_response' && m.senderId === profile.id && m.responseTo === calibrateMessage.id) {
                        calibrateMessage = m
                        calibratorOpen = false
                        // calculate my offset time
                    }
                }
            })
            setCalibrationMessage(calibrateMessage)
            if (calibratorOpen) {
                console.log('FIRE UP THE CALIBRATOR')
                
                props.setShowCalibrator(true)
            }
        }
    }, [messages])

    const handleFormData = (e) => {
        setFormValue(e.target.value)
    };

    const handleKeystroke = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            sendMessage()
        }
    };

    // for sending a message
    const [formValue, setFormValue] = useState('');
    const sendMessage = async(e) => {
        await messagesRef.add({
        content: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        partyId: props.party.id,
        senderId: profile.id,
        full_name: profile.full_name,
        profile_pic: profile.profile_pic,
        systemMessage: false,
        timeOffset: props.timeOffset
        });
        setFormValue('');
        endOfFeed.current.scrollIntoView({ behavior: 'smooth' })
    }

    const sendCalibrationCall = async(cal) => {
        await messagesRef.add({
        content: cal.message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        partyId: props.party.id,
        senderId: profile.id,
        full_name: profile.full_name,
        profile_pic: profile.profile_pic,
        systemMessage: true,
        messageType: 'calibration_call',
        responseTo: null
        });
    }

    const deleteMessage = (messageId) => {
        messagesRef.doc(messageId).delete()
    };

    // TODO: may not need the if statement?
    const updateMessage = (messageId, content) => {
        if (content) {
            messagesRef.doc(messageId).update({ content, lastUpdated: firebase.firestore.FieldValue.serverTimestamp() })
        } else {
            messagesRef.doc(messageId).update({ lastUpdated: firebase.firestore.FieldValue.serverTimestamp() })
        }
    };
    
    return (
        <>
        <ChatCalibrator 
            formOpen={props.showCalibrationForm} 
            setFormOpen={props.setShowCalibrationForm} 
            calibratorOpen={props.showCalibrator} 
            setCalibratorOpen={props.setShowCalibrator}
            sendCalibrationCall={sendCalibrationCall}
            calibrationMessage={calibrationMessage}
        />

        <div className="chatroom-container">
            <div className="chat-feed">
                {messages && messages.map(msg => 
                    msg.systemMessage
                        ? ''
                        : <ChatMessage 
                            key={msg.id} 
                            message={msg} 
                            readerId={profile.id} 
                            deleteMessage={deleteMessage} 
                            updateMessage={updateMessage} 
                            reactionTypes={reactionTypes} 
                            delay={props.timeOffset} />
                            )}
                <span ref={endOfFeed}></span>
            </div>
            <div className="chat-footer">
                <form className="chat-message-form w-100" onSubmit={sendMessage}>
                    <textarea 
                        className="chat-text-input-window w-100"
                        rows="2"
                        value={formValue}
                        onKeyDown={(e) => {handleKeystroke(e)}}
                        onChange={(e) => {handleFormData(e)}}/>
                <div className="message-controls d-flex justify-content-around">
                    <i className="fas fa-paper-plane fa-2x message-button" onClick={sendMessage}></i>
                    <i className="fas fa-smile fa-2x message-button"></i>
                </div>
                </form>
            </div>
        </div>
        </>
    )
    };

