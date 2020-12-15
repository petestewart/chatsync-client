import React, { useState } from "react"

export const PartyContext = React.createContext()

export const PartyProvider = (props) => {
    const convertToUTC = (datetime) => {
        
    };

    const [party, setParty] = useState({
        id: 0,
        creator: {},
        url: '',
        title: '',
        description: '',
        datetime: '',
        is_public: false
    })

    const getParty = (partyId) => {
        return fetch(`http://localhost:8000/parties/${partyId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(setParty)
    }

    const createParty = (partyInfo) => {
        return fetch('http://localhost:8000/parties', {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(partyInfo)
        })
            .then(response => response.json())
            .then(setParty)
            .then(data => {return(data)})
    };

    const updateParty = (partyInfo) => {
        return fetch(`http://localhost:8000/parties/${partyInfo.id}`, {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(partyInfo)
        })
            .then(response => response.json())
            .then(setParty)
            .then(data => {return(data)})
    };


    return (
        <PartyContext.Provider value={{
            party, getParty, updateParty, createParty
        }}>
            {props.children}
        </PartyContext.Provider>
    )
}