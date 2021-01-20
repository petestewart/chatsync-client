import React, { useContext, useState, useEffect } from "react"


import { PartyContext } from "../../Party/PartyProvider"
import { ProfileContext } from "../../Profile/ProfileProvider"

import { MemberSelector } from '../MemberSelector/MemberSelector'

import "./InviteForm.css"


export const InviteForm = props => {
    const [guests, setGuests] = useState([])

    const { getAllProfiles, allProfiles } = useContext(ProfileContext)
    const { getPartyGuests, addPartyGuest, deletePartyGuest } = useContext(PartyContext)

    useEffect(() => {
        if (props.party.id === 0) {return} 
        getPartyGuests(props.party.id)
        .then (
            (currentGuests) => {
                const guestIds = currentGuests.map((guest) => guest.guest_id)
                setGuests(guestIds)
        })
    }, [props.party])

    useEffect(getAllProfiles, [])

    const addGuest = (guestId) => {
        addPartyGuest(props.party.id, guestId)
            .then(() => {
                getPartyGuests(props.party.id)
                .then (
                    (currentGuests) => {
                        const guestIds = currentGuests.map((guest) => guest.guest_id)
                        setGuests(guestIds)
                })
            })
    };

    const removeGuest = (guestId) => {
        deletePartyGuest(props.party.id, guestId)
        .then(() => {
            getPartyGuests(props.party.id)
            .then (
                (currentGuests) => {
                    const guestIds = currentGuests.map((guest) => guest.guest_id)
                    setGuests(guestIds)
            })
        })
    };

    const getGuestName = (guestId) => {
        const guest = allProfiles.find((member) => guestId === member.id)
        if (guest)  { return (
        <span 
            className="selected-option"
            key={guestId}>
                <span className="mr-1 remove-selection-button" aria-hidden="true" onClick={() => {removeGuest(guestId)}}>&times;</span>
                {guest.full_name}
            </span>) }
    };



    return (
    <>
        <main className="inviteform-container">
            <span className="ml-3 mt-2 selector-close-menu-button" aria-hidden="true" onClick={() => {props.setShowInviteForm(false)}}>&times;</span>
            <section className="p-3">
                <div className="selected-list mb-1">
                    <small>
                        Invited Guests:
                        {guests.map((guestId) => getGuestName(guestId))}
                    </small>
                </div>
                <MemberSelector options={allProfiles} selected={guests} addSelection={addGuest} />
            </section>
        </main>
    </>
    )
}