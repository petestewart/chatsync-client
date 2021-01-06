import React, { useState } from "react"

export const ChatContext = React.createContext()

export const ChatProvider = (props) => {

    const [reactionTypes, setReactionTypes] = useState([])

    const toggleReaction = (reaction) => {
        return fetch('http://localhost:8000/messagereactions', {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "message_id": reaction.messageId,
                    "party_id": reaction.partyId,
                    "reaction_id": reaction.reactionId
                }
            )
        })
            // .then(response => response.json())
            .then(data => {return(data)})
    }

    const getReactionsByMessage = (messageId) => {
        return fetch(`http://127.0.0.1:8000/messagereactions?message_id=${messageId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {return(data)})
    }

    const getAllReactionTypes = () => {
        return fetch('http://127.0.0.1:8000/reactions', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(res => {
                    return (
                        res.map(
                            (reaction) => {return({
                                id: reaction.id,
                                name: reaction.name,
                                short_names: [reaction.name]})}
                        )
                    )
                })
                .then(data => {setReactionTypes(data)})
    }
    
    return (
        // <ChatContext.Provider value={{firebaseInfo, getReactionsByMessage, reactionTypes, getAllReactionTypes, toggleReaction}}>
        <ChatContext.Provider value={{getReactionsByMessage, reactionTypes, getAllReactionTypes, toggleReaction}}>
            {props.children}
        </ChatContext.Provider>
    )
}

// export const firebaseInfo = {
//             apiKey: "AIzaSyALgLboaRpdiz584kKvzJ0qJNd-6SahHA4",
//             authDomain: "superchat-fced2.firebaseapp.com",
//             databaseURL: "https://superchat-fced2.firebaseio.com",
//             projectId: "superchat-fced2",
//             storageBucket: "superchat-fced2.appspot.com",
//             messagingSenderId: "81562913345",
//             appId: "1:81562913345:web:66125db20cee23cd3494c0"
//     }