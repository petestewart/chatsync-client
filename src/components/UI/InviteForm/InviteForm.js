import React, { useContext, useState, useEffect } from "react"

import { ProfileContext } from "../../Profile/ProfileProvider"


import "./InviteForm.css"


export const InviteForm = props => {
    const [guests, setGuests] = useState([])
    const { getAllProfiles, allProfiles } = useContext(ProfileContext)

    useEffect(getAllProfiles, [])



    return (
        <main className="inviteform-container px-3">
            <h2 className="mt-3 text-center">Invite Guests to PARTY</h2>
            <section className="mt-5">
                TEXTBOX HERE
            </section>
        </main>
            
    )
}