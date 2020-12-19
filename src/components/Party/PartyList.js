import React, { useContext, useState, useEffect } from "react"
import dayjs from 'dayjs'

import { PartyContext } from "../Party/PartyProvider"
import { PartyCard } from "../Party/PartyCard"

export const PartyList = props => {
    const { getUpcomingParties, upcomingParties } = useContext(PartyContext)

    const [partyList, setPartyList] = useState([])

    useEffect(getUpcomingParties, [])

    useEffect(() => {
        // sort upcoing parties in order by date
        if (upcomingParties.length > 0) {
            setPartyList([...upcomingParties].sort((a, b) => dayjs(a.datetime).valueOf() > dayjs(b.datetime).valueOf() ? 1 : -1))
        }
    }, [upcomingParties])


    


    return (
        <main className="partylist-container px-3">
            <h2 className="mt-3 text-center">Upcoming Events</h2>
            <section className="mt-5 mb-3">
                { upcomingParties.length > 0
                    ? partyList.map((party, index) => <PartyCard party={party} key={index} {...props} />)
                    : ''
                }
            </section>
        </main>
            
    )
}