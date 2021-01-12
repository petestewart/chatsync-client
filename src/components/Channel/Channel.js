import React, { useContext, useState, useEffect } from "react"
import dayjs from 'dayjs'


import { MemberSelector } from '../UI/MemberSelector/MemberSelector'

import { ChannelContext } from "../Channel/ChannelProvider"
import { PartyContext } from "../Party/PartyProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

import './Channel.css'
// import { matchPath } from "react-router-dom"

export const Channel = props => {
    const { channel, deleteChannelMember, getChannel, createChannelMember } = useContext(ChannelContext)
    const { profile, getProfile, allProfiles, getAllProfiles } = useContext(ProfileContext)
    const { getPartiesByChannel } = useContext(PartyContext)

    const [showInviteForm, setShowInviteForm] = useState(false)
    const [availableInvitees, setAvailableInvitees] = useState([])
    const [channelParties, setChannelParties] = useState([])

    const [showLeaveWarning, setShowLeaveWarning] = useState(false)

    const [isMember, setIsMember] = useState(false)

    useEffect(() => {
        let status = false
        if (channel.members) {
            channel.members.forEach((member) => {
                if (member.member_id === profile.id) {
                    status = true
                }
            })
        }
        setIsMember(status)
    }, [channel.members, profile])



    useEffect(() => {
        getProfile()
        getChannel(props.match.params.id)
        getAllProfiles()
        getPartiesByChannel(props.match.params.id)
            .then((res) => setChannelParties(res))
    }, [props.match.params.id])

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
        <>
        <div className="text-center channel-title text-warning">
                <h3>#{channel.name}</h3>
        </div>
        <main className="channel-container container px-3">





        <div className="mt-3">
            <div className="channel-header row">
                <div className="col-4">
                    {
                        channel.image
                        ? <img className="channel-page-pic" src={channel.image} alt=""/>
                        : ''
                    }
                </div>
                <div className="col-7">
                    {channel.description}
                </div>
                <div className="col-1">
                <i className="fas fa-cog edit-channel-btn mr-3" onClick={() => props.history.push(`/channels/edit/${channel.id}`)}></i>
                </div>
            </div>
            <div className="channel-events row mt-2">
                <div className="col-12">
                {
                    channelParties
                    ? <>
                        <h6 className="muted-text">Upcoming Events:</h6>
                        {channelParties.map((party) => 
                            <div className="bright-hover ml-1" 
                                key={party.id}
                                onClick={() => {props.history.push(`/party/${party.id}`)
                            }}>
                                <i className="far fa-calendar ml-1 mr-2"></i>
                                {party.title} 
                                <small>
                                    {dayjs(party.datetime).format(' MM/D/YY h:mmA ')}
                                </small>
                            </div>)}
                    </>
                    : ''
                }
                    
                <button className="btn btn-primary w-100 mt-3" onClick={() => {
                    props.history.push(`/parties/create?channel_id=${channel.id}`)}}>
                        <i className="fas fa-calendar-plus"></i> Create Channel Event
                </button>
                </div>
            </div>
            <div className="channel-members row mt-2">
                <div className="col-12">
                    <h6 className="muted-text">Members:</h6>
                    <div className="channel-members-list">

                    {   channel.members
                        ?   channel.members.map((m) => <div className="bright-hover ml-1" key={m.member_id} onClick={() => {props.history.push(`/profile/${m.member_id}`)}}>
                            <img src={m.profile_pic} alt="" className="avatar_sm mx-2"/>
                            {m.full_name}
                            </div>)
                        : ''}
                    </div>
                    {
                        showInviteForm
                        ? <MemberSelector 
                            options={ availableInvitees}
                            selected={[channel.members]} addSelection={addMember} 
                        />
                        : ''
                    }
                    {
                        isMember
                        ?   <>
                            <button className="btn btn-primary w-100 mt-3"
                                onClick={() => {setShowInviteForm(!showInviteForm)}}>
                                <i className="fas fa-user-plus"></i> Invite Members
                            </button>
                            {
                                showLeaveWarning
                                ?   <div className="alert alert-danger mt-3" role="alert">
                                        Leave #{channel.name}?
                                        <button className="btn-sm btn-danger ml-3"
                                            onClick={leaveChannel}>
                                            Leave
                                        </button>
                                        <button className="btn-sm btn-light ml-3"
                                            onClick={() => {setShowLeaveWarning(false)}}>
                                            Cancel
                                        </button>
                                    </div>
                                :   <button className="btn btn-secondary w-100 mt-3"
                                        onClick={() => {setShowLeaveWarning(true)}}>
                                            <i className="fas fa-users-slash"></i> Leave Channel
                                        </button>
                            }
                            </>
                        :   <button className="btn btn-dark w-100 mt-3"
                            onClick={() => {addMember(profile.id)}}>
                            <i className="fas fa-user-plus"></i> Join Channel
                        </button>
                    }
                    
                    
                </div>
            </div>
        </div>
    </main>
    </>
    )

}