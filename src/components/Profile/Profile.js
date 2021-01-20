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
        if (userProfile.id) {
            getChannelsByMember(userProfile.id)
            .then((res) => setUserChannels(res))}
        }
        , [userProfile])

    return (
        <main className="profile-container container px-3">
            <div className="row d-flex align-items-center">
            {
                userProfile.id === profile.id
                ?  <>           
                        <div className="col-2"></div>
                        <div className="col-8">
                            <h6 className="mt-3 text-secondary text-center">Your Profile</h6>
                        </div>
                        <div className="col-2 ">
                                <i className="fas fa-cog edit-profile-btn" onClick={() => props.history.push("profile/edit")}></i>
                        </div>
                    </>
                : ''
            }
            </div>
            <div className="mt-3">
                <div className="profile-header row">
                    <div className="col-4 profile-page-pic">
                        <img className="profile-page-pic" src={userProfile.profile_pic !== '' ? userProfile.profile_pic : 'https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Account-2-256.png'} alt="profile pic"/>
                    </div>
                    <div className="col-8">
                        <h4 className="my-0 text-warning">{userProfile.full_name}</h4>
                        <div>

                        <small className="muted-text">{userProfile.location}</small>
                        </div>
                        
                        <div className="">{userProfile.bio}</div>
                    </div>
                </div>
                {
                    userChannels && userChannels.length > 0
                    ? <div className="profile-channel-list row mt-3">
                    <div className="col-12">
                        <h6 className="muted-text">My Channels:</h6>
                        <div>
                        {userChannels.map((channel) => <div className="bright-hover ml-1" key={channel.id} onClick={() => {
                        props.history.push(`/channels/${channel.id}`)
                        }}><small>
                            #{channel.name}
                            </small></div>)}
                        </div>
                    </div>
                </div>
                    : ''
                }
                
            </div>
        </main>
    )
}