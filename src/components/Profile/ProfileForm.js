import React, { useContext, useState, useEffect } from "react"

import { ProfileContext } from "../Profile/ProfileProvider"



export const ProfileForm = props => {
    const { profile, getProfile, updateProfile } = useContext(ProfileContext)

    const [profileInfo, setProfileInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: '',
        bio: '',
        profile_pic: '',
        time_zone_offset: 0
    })

    useEffect(() => {
        if (profile.user) {
            setProfileInfo({
                first_name: profile.user.first_name,
                last_name: profile.user.last_name,
                email: profile.user.email,
                location: profile.location,
                bio: profile.bio,
                profile_pic: profile.profile_pic,
                time_zone_offset: profile.time_zone_offset,
            })
        }
    }, [profile])

    // useEffect(() => {
    //     getProfile()
    //         .then(() => setProfileInfo(profile))
    // }, [])


    
    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...profileInfo }
        formInfo[e.target.id] = e.target.value
        setProfileInfo(formInfo)
        };

    const handleFormSubmission = (e) => {
        e.preventDefault()
        updateProfile(profileInfo)
    };



    return (
        <main className="profile-container px-3">
        <h3 className="mt-3 text-center">Your Profile</h3>
            <section>

            <form className="profile-form my-5" onSubmit={handleFormSubmission}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input onChange={handleFormInput} type="text" id="first_name" className="form-control" value={profileInfo.first_name} required autoFocus />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input onChange={handleFormInput} type="text" id="last_name" className="form-control" value={profileInfo.last_name} required />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleFormInput} type="email" id="email" className="form-control" value={profileInfo.email} required />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location </label>
                    <input onChange={handleFormInput} type="text" id="location" className="form-control" value={profileInfo.location} />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea onChange={handleFormInput} className="form-control" id="bio" rows="3"></textarea>
                </div>

                <button className="btn btn-success w-100" onClick={handleFormSubmission}>Save</button>
            </form>
        </section>
    </main>
    )
}