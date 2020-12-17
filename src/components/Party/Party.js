import React, { useContext, useState, useEffect } from "react"
import dayjs from 'dayjs'

import { PartyContext } from "../Party/PartyProvider"

import { PartyForm } from "../Party/PartyForm"
import { InviteForm } from "../UI/InviteForm/InviteForm"

export const Party = props => {
    const { getParty, party } = useContext(PartyContext)

    useEffect(() => {
        getParty(props.match.params.id)
    }, [])

    
    


    return (
        <main className="profile-container px-3">
            <h2 className="mt-3 text-center">Party</h2>
            <section className="mt-5">
                {party.title}
                <button>Invite</button>
                <InviteForm party={party} />
            </section>
        </main>
            
    )
}