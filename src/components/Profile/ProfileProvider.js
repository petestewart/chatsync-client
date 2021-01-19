import React, { useState, useEffect } from "react"

import apiKeys from '../../helpers/apiKeys.json';

const baseURL = apiKeys.chatSyncServer.baseURL;

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
        return fetch(`${baseURL}/members/me`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
            .then((res) => {return(res)})
    }

    const getProfileById = (memberId) => {
        return fetch(`${baseURL}/members/${memberId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then((res) => {return(res)})
    }

    const getAllProfiles = () => {
        return fetch(`${baseURL}/members`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`
            }
        })
            .then(response => response.json())
            .then(response => response.sort((a, b) => a.full_name > b.full_name ? 1 : -1))
            .then(setAllProfiles)
    }

    const updateProfile = (profileInfo) => {
        return fetch(`${baseURL}/members/me`, {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json"
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
            profile, getProfile, updateProfile, allProfiles, getAllProfiles, getProfileById
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}