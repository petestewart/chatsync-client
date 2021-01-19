import React, { useState, useContext } from "react"
import dayjs from 'dayjs'

import { ProfileContext } from "../Profile/ProfileProvider"

import apiKeys from '../../helpers/apiKeys.json';

const baseURL = apiKeys.chatSyncServer.baseURL;

export const PartyContext = React.createContext()

export const PartyProvider = (props) => {

    const [upcomingParties, setUpcomingParties] = useState([])

    const { profile, getProfile } = useContext(ProfileContext)

    const [party, setParty] = useState({
        id: 0,
        guests: [],
        url: '',
        title: '',
        creator: {},
        description: '',
        datetime: '',
        datetime_end: '',
        is_public: true
    })

    const createInstantParty = () => new Promise((resolve, reject) => {
        getProfile()
            .then(() => {
                const partyInfo = {
                    title: `${profile.full_name}'s Party`,
                    description: '',
                    datetime: dayjs(new Date().toUTCString()).format('YYYY-M-D HH:mmZ'),
                    datetime_end: dayjs(new Date().toUTCString()).add(4, 'hour').format('YYYY-M-D HH:mmZ'),
                    is_public: true,
                    channel_id: null
                }
                createParty(partyInfo)
                    .then((res) => {
                        resolve(res)
                    })
            })
            .catch((err) => reject)
    })

    const getParty = (partyId) => {
        return fetch(`${baseURL}/parties/${partyId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json()
                .then((res) => {
                    setParty(res)
                    return(res)}
                    ))
    }

    const getPartiesByChannel = (channelId) => {
        return fetch(`${baseURL}/parties?channel_id=${channelId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(data => {return(data.sort(
                (a,b) => 
                (dayjs(a.datetime).valueOf()) - (dayjs(b.datetime).valueOf())
                ))})
    }

    const getPartyGuests = (partyId) => {
        return fetch(`${baseURL}/partyguests/${partyId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json()
                .then(data => {return(data)}))
    }

    const addPartyGuest = (partyId, guestId) => {
        return fetch(`${baseURL}/partyguests`, {
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
        return fetch(`${baseURL}/partyguests/${partyId}`, {
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
        return fetch(`${baseURL}/parties/myupcoming`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json()
            .then((res) => setUpcomingParties(res)))
    }

    const createParty = (partyInfo) => {
        return fetch(`${baseURL}/parties`, {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(partyInfo)
        })
            .then(response => response.json()
                .then((res) => {
                    setParty(res)
                    return(res)}
                    ))
    };

    const setPartyGuestList = (partyId, newGuests) => {
        getPartyGuests(partyId)
            .then((guestList) => {
                const promises = []
                // create array of pre-existing guests' ids
                const currentGuests = []
                guestList.forEach((g) => currentGuests.push(g.guest_id))
                // add all new guests that aren't already pre-existing guests
                newGuests.forEach((g) => {
                    if (!currentGuests.includes(g)) {
                        promises.push(new Promise((resolve, reject) => {
                            addPartyGuest(partyId, g)
                                .then(() => resolve(g))
                                .catch((err) => reject(err))
                        }))
                    }
                })
                // delete all pre-existing guests not in new guest list
                currentGuests.forEach((g) => {
                    if (!newGuests.includes(g)) {
                        promises.push(new Promise((resolve, reject) => {
                            deletePartyGuest(partyId, g)
                                .then(() => resolve(g))
                                .catch((err) => reject(err))
                        }))
                    }
                })
                Promise.all(promises)
                    .then((res) => {
                        return(res)
                    })
            })
    }

    const updateParty = (partyInfo) => {
        return fetch(`${baseURL}/parties/${partyInfo.id}`, {
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

    const deleteParty = (partyId) => {
        return fetch(`${baseURL}/parties/${partyId}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => {return})
    };


    return (
        <PartyContext.Provider value={{
            party, getUpcomingParties, getParty, updateParty, createParty, upcomingParties, getPartyGuests, addPartyGuest, deletePartyGuest, getPartiesByChannel, setPartyGuestList, deleteParty, createInstantParty
        }}>
            {props.children}
        </PartyContext.Provider>
    )
}