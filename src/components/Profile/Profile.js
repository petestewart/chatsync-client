import React, { useContext } from "react"

import { ProfileContext } from "../Profile/ProfileProvider"

import "./Profile.css"

export const Profile = props => {
    const { profile } = useContext(ProfileContext)

    return (
        <main className="profile-container container px-3">
            <div className="row d-flex align-items-center">
                <div className="col-2"></div>
                <div className="col-8">
                    <h2 className="mt-3 text-center">Your Profile</h2>
                </div>
                <div className="col-2 ">
                    {/* <Link to={'profile/edit'}> */}
                        <i className="fas fa-cog edit-profile-btn" onClick={() => props.history.push("profile/edit")}></i>
                    {/* </Link> */}
                </div>

            </div>
            <div className="mt-3">
                <div className="profile-header row">
                    <div className="col-4">
                        <img className="profile-page-pic w-100" src={profile.profile_pic !== '' ? profile.profile_pic : 'https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Account-2-256.png'} alt="profile pic"/>
                    </div>
                    <div className="col-8">
                        <h3 className="my-0">{profile.full_name}</h3>
                        {profile.location}
                    </div>
                </div>
                <div className="profile-bio row mt-2">
                    <div className="col-12">
                        {profile.bio}
                    </div>
                </div>
            </div>
        </main>
    )
}