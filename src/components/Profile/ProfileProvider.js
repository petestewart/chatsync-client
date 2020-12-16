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

    const [allProfiles, setAllProfiles] = useState([])

    const getProfile = () => {
        return fetch("http://localhost:8000/members/me", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }

    const getAllProfiles = () => {
        return fetch("http://localhost:8000/members", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(response => response.sort((a, b) => a.full_name > b.full_name ? 1 : -1))
            .then(setAllProfiles)
    }

    const updateProfile = (profileInfo) => {
        return fetch("http://localhost:8000/members/me", {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(profileInfo)
        })
            .then(response => response.json())
            .then(setProfile)
            .then(data => {return(data)})
    };

    useEffect(getProfile, [])

    return (
        <ProfileContext.Provider value={{
            profile, getProfile, updateProfile, allProfiles, getAllProfiles
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}