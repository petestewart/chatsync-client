import React, { useContext, useState, useEffect } from "react"

import { ProfileContext } from "../Profile/ProfileProvider"



export const Profile = props => {
    const { profile, getProfile } = useContext(ProfileContext)

    



    return (
        <main className="profile-container px-3">
        <h3 className="mt-3 text-center">Your Profile</h3>
            <section>
            (PROFILE HERE)
            
            </section>
    </main>
    )
}