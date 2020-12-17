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

    const getPartyGuests = (partyId) => {
        return fetch(`http://localhost:8000/partyguests/${partyId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(data => {return(data)})
    }

    const addPartyGuest = (partyId, guestId) => {
        return fetch('http://localhost:8000/partyguests', {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "guest_id": guestId,
                    "party_id": partyId,
                    "rsvp": false
                }
            )
        })
            .then(response => response.json())
            .then(data => {return(data)})
    }
    const deletePartyGuest = (partyId, guestId) => {
        return fetch(`http://localhost:8000/partyguests/${partyId}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "guest_id": guestId
                }
            )
        })
            .then(response => response.json())
            .then(data => {return(data)})
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
            party, getUpcomingParties, getParty, updateParty, createParty, upcomingParties, getPartyGuests, addPartyGuest, deletePartyGuest
        }}>
            {props.children}
        </PartyContext.Provider>
    )
}