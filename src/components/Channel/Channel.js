import React, { useContext, useState, useEffect } from "react"

import { MemberSelector } from '../UI/MemberSelector/MemberSelector'

import { ChannelContext } from "../Channel/ChannelProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

import './Channel.css'
import { matchPath } from "react-router-dom"

export const Channel = props => {
    const { channel, deleteChannelMember, getChannel, createChannelMember } = useContext(ChannelContext)
    const { profile, getProfile, allProfiles, getAllProfiles } = useContext(ProfileContext)

    const [showInviteForm, setShowInviteForm] = useState(false)
    const [availableInvitees, setAvailableInvitees] = useState([])

    const [showLeaveWarning, setShowLeaveWarning] = useState(false)

    useEffect(() => {
        getChannel(props.match.params.id)
        getAllProfiles()
    }, [])

    useEffect(() => {
        if (channel.members) {
            const availableUsers = []
            allProfiles.forEach((p) => {
                let available = true
                channel.members.forEach((m) => {
                    if (m.member_id === p.id) {
                        available = false
                    }
                })
                if (available) {
                    availableUsers.push(p)
                }
            })
            setAvailableInvitees(availableUsers)
        }
    }, [allProfiles, channel])

    const addMember = (memberId) => {
        createChannelMember(channel.id, memberId)
            .then(() => getChannel(channel.id))
    };

    const leaveChannel = () => {
        deleteChannelMember(channel.id, profile.id)
            .then(() => props.history.push("/"))
    };

    return (
        <main className="channel-container container px-3">
        <div className="row d-flex align-items-center">
            <div className="col-2"></div>
            <div className="col-8">
                <h2 className="mt-3 text-center">#{channel.name}</h2>
            </div>
            <div className="col-2 ">
                {/* <Link to={'channel/edit'}> */}
                    <i className="fas fa-cog edit-channel-btn" onClick={() => props.history.push("channel/edit")}></i>
                {/* </Link> */}
            </div>

        </div>
        <div className="mt-3">
            <div className="channel-header row">
                <div className="col-4">
                    <img className="channel-page-pic w-100" src={channel.image !== '' ? channel.image : 'https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Account-2-256.png'} alt="channel pic"/>
                </div>
                <div className="col-8">
                    {channel.description}
                </div>
            </div>
            <div className="channel-events row mt-2">
                <div className="col-12">
                    <h6>Upcoming Events:</h6>
                <button className="btn btn-success w-100 mt-3" onClick={() => {}}><i className="fas fa-calendar-plus"></i> Create Channel Event</button>
                </div>
            </div>
            <div className="channel-members row mt-2">
                <div className="col-12">
                    <h6>Members:</h6>
                    <ul className="channel-members-list">

                    {   channel.members
                        ?   channel.members.map((m) => <li key={m.member_id}>
                            <img src={m.profile_pic} alt="" className="avatar_sm mr-2"/>
                            {m.full_name}
                            </li>)
                        : ''}
                    </ul>
                    {
                        showInviteForm
                        ? <MemberSelector 
                            options={ availableInvitees}
                            selected={[channel.members]} addSelection={addMember} 
                        />
                        : ''
                    }
                    
                    <button className="btn btn-primary w-100 mt-3" onClick={() => {setShowInviteForm(!showInviteForm)}}><i className="fas fa-user-plus"></i> Invite Members</button>
                    {
                        showLeaveWarning
                        ?   <div className="alert alert-danger mt-3" role="alert">
                                Leave #{channel.name}?
                                <button className="btn-sm btn-danger ml-3" onClick={leaveChannel}>Leave</button>
                                <button className="btn-sm btn-light ml-3" onClick={() => {setShowLeaveWarning(false)}}>Cancel</button>
                            </div>
                        :   <button className="btn btn-secondary w-100 mt-3" onClick={() => {setShowLeaveWarning(true)}}><i className="fas fa-users-slash"></i> Leave Channel</button>
                    }
                    
                </div>
            </div>
        </div>
    </main>
    )

}