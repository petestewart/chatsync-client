import React, { useContext, useState, useEffect } from "react"

import { ChannelContext } from "../Channel/ChannelProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

import "./Profile.css"

export const Profile = props => {
    const { profile, getProfileById } = useContext(ProfileContext)
    const { getChannelsByMember } = useContext(ChannelContext)

    const [userProfile, setUserProfile] = useState({})

    const [userChannels, setUserChannels] = useState([])
    
    useEffect(() => {
        if (props.match.params.id && props.match.params.id !== userProfile.id) {
            getProfileById(props.match.params.id)
            .then((res) => setUserProfile(res))
        } else {
            setUserProfile(profile)
        }
    }, [props.match.params.id, profile])
    
    useEffect(() => {
        getChannelsByMember(userProfile.id)
            .then((res) => setUserChannels(res))
    }, [userProfile])

    return (
        <main className="profile-container container px-3">
            <div className="row d-flex align-items-center">
            {
                userProfile.id === profile.id
                ?  <>           
                        <div className="col-2"></div>
                        <div className="col-8">
                            <h2 className="mt-3 text-center">Your Profile</h2>
                        </div>
                        <div className="col-2 ">
                            {/* <Link to={'profile/edit'}> */}
                                <i className="fas fa-cog edit-profile-btn" onClick={() => props.history.push("profile/edit")}></i>
                            {/* </Link> */}
                        </div>
                    </>
                : ''
            }
            </div>
            <div className="mt-3">
                <div className="profile-header row">
                    <div className="col-4">
                        <img className="profile-page-pic w-100" src={userProfile.profile_pic !== '' ? userProfile.profile_pic : 'https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Account-2-256.png'} alt="profile pic"/>
                    </div>
                    <div className="col-8">
                        <h3 className="my-0">{userProfile.full_name}</h3>
                        <small>{userProfile.location}</small>
                    </div>
                </div>
                <div className="profile-bio row mt-2">
                    <div className="col-12 text-center">
                        <small>{userProfile.bio}</small>
                    </div>
                </div>
                <div className="profile-channel-list row mt-3">
                    <div className="col-12">
                        <h6>My Channels:</h6>
                        <div>
                        {userChannels.map((channel) => <div className="sidemenu-item ml-1" key={channel.id} onClick={() => {
                        props.history.push(`/channels/${channel.id}`)
                        }}><small>
                            #{channel.name}
                            </small></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}