import React, { useState } from "react"

export const PartyContext = React.createContext()

export const PartyProvider = (props) => {
    const convertToUTC = (datetime) => {
        
    };

    const [upcomingParties, setUpcomingParties] = useState([], [])


    const [party, setParty] = useState({
        id: 0,
        guests: {},
        url: '',
        title: '',
        creator: {},
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

    const getUpcomingParties = (partyId) => {
        return fetch('http://localhost:8000/parties/myupcoming', {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(setUpcomingParties)
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
            party, getUpcomingParties, getParty, updateParty, createParty, upcomingParties
        }}>
            {props.children}
        </PartyContext.Provider>
    )
}