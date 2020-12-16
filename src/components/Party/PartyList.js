import React, { useContext, useState, useEffect } from "react"

import { PartyContext } from "../Party/PartyProvider"
import { PartyCard } from "../Party/PartyCard"

export const PartyList = props => {
    const { getUpcomingParties, upcomingParties } = useContext(PartyContext)

    useEffect(getUpcomingParties, [])

    if (upcomingParties.length > 0) {
        const partyList = upcomingParties.map((party, index) => <PartyCard party={party} key={index} />);
      }


    return (
        <main className="profile-container px-3">
            <h2 className="mt-3 text-center">Upcoming Events</h2>
            <section className="mt-5">
                { upcomingParties.length > 0
                    ? upcomingParties.map((party, index) => <PartyCard party={party} key={index} />)
                    
                    : ''
                }
            </section>
        </main>
            
    )
}