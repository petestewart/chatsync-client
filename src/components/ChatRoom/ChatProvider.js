import React, { useState } from "react"

import apiKeys from '../../helpers/apiKeys.json';

const baseURL = apiKeys.chatSyncServer.baseURL;

export const ChatContext = React.createContext()

export const ChatProvider = (props) => {

    const [reactionTypes, setReactionTypes] = useState([])

    const toggleReaction = (reaction) => {
        return fetch(`${baseURL}/messagereactions`, {
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
            .then(data => {return(data)})
    }

    const getReactionsByMessage = (messageId) => {
        return fetch(`${baseURL}/messagereactions?message_id=${messageId}`, {
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
        return fetch(`${baseURL}/reactions`, {
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
        <ChatContext.Provider value={{getReactionsByMessage, reactionTypes, getAllReactionTypes, toggleReaction}}>
            {props.children}
        </ChatContext.Provider>
    )
}
