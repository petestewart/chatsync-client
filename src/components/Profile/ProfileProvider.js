import React, { useState, useEffect } from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        bio: '',
        profilePic: '',
        timeZoneOffset: 0
    })

    const getProfile = () => {
        return fetch("http://localhost:8000/members/me", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_id")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }

    const updateProfile = (profileInfo) => {
        return fetch("http://localhost:8000/members/me", {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_id")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(profileInfo)
        })
            .then(response => response.json())
            .then(setProfile)
    };

    useEffect(getProfile, [])

    return (
        <ProfileContext.Provider value={{
            profile, getProfile, updateProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}