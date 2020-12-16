import React, { useContext, useState, useEffect } from "react"


import { ProfileContext } from "../../Profile/ProfileProvider"

import { MemberSelector } from '../MemberSelector/MemberSelector'


import "./InviteForm.css"


export const InviteForm = props => {
    const [guests, setGuests] = useState([2])
    const { getAllProfiles, allProfiles } = useContext(ProfileContext)

    useEffect(getAllProfiles, [])

    const addGuest = (guestId) => {
        setGuests([...guests, guestId])
    };

    const getGuestName = (guestId) => {
        const guest = allProfiles.find((member) => guestId === member.id)
        return (<h6>{guest.full_name}</h6>)
    };



    return (
        <main className="inviteform-container px-3">
            <h2 className="mt-3 text-center">Invite Guests to PARTY</h2>
            <section className="mt-5">
                Invited Guests:
                {guests.map((guestId) => getGuestName(guestId))}
                <MemberSelector options={allProfiles} selected={guests} addSelection={addGuest} />
            </section>
        </main>
            
    )
}