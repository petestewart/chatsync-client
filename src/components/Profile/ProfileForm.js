import React, { useContext, useState, useEffect } from "react"

import { ProfileContext } from "../Profile/ProfileProvider"

import './ProfileForm.css'

export const ProfileForm = props => {
    const { profile, updateProfile } = useContext(ProfileContext)

    const [base64, setBase64] = useState(null)

    const [profileInfo, setProfileInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: '',
        bio: '',
        profile_pic: '',
        time_zone_offset: -6
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

    const getBase64 = (file, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(file)
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setBase64(base64ImageString)
        })
    }

    
    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...profileInfo }
        formInfo[e.target.id] = e.target.value
        setProfileInfo(formInfo)
        };

    const handleFormSubmission = (e) => {
        e.preventDefault()
        updateProfile({...profileInfo, profile_pic: base64})
            .then(() => {props.history.push("/profile")})
    };



    return (
        <main className="profile-container px-3">
        <h3 className="mt-3 text-center text-warning">Your Profile</h3>
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
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleFormInput} type="email" id="email" className="form-control" value={profileInfo.email} required />
                </div>
                <div className="image-preview-container">
                    {
                        profileInfo.profile_pic || base64
                        ? <img className="image-preview" src={base64 || profileInfo.profile_pic} alt="preview"/>
                        : ''
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="image">Profile Pic</label>
                    <input onChange={createImageString} type="file" id="image" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input onChange={handleFormInput} type="text" id="location" className="form-control" value={profileInfo.location} />
                </div>
                <div className="form-group">
                    <label htmlFor="time_zone_offset">Time Zone</label>
                    <select value={profileInfo.time_zone_offset} id="time_zone_offset" className="form-control" onChange={handleFormInput}>
                        <option value={-8}>Pacific Standard Time (GMT-8)</option>
                        <option value={-7}>Mountain Standard Time (GMT-7)</option>
                        <option value={-6}>Central Standard Time (GMT-6)</option>
                        <option value={-5}>Eastern Standard Time (GMT-5)</option>
                    </select>
                    </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea onChange={handleFormInput} className="form-control" id="bio" rows="3" value={profileInfo.bio}></textarea>
                </div>

                <button className="btn btn-success w-100" onClick={handleFormSubmission}>Save</button>
                <button className="btn btn-secondary w-100 mt-3" onClick={() => {props.history.push("/profile")}}>Cancel</button>
            </form>
        </section>
    </main>
    )
}
