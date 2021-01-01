import React, { useContext, useState, useEffect } from "react"

import { MemberSelector } from '../UI/MemberSelector/MemberSelector'

import { ChannelContext } from "../Channel/ChannelProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

export const ChannelForm = props => {

    const { channel, createChannel, createChannelMember } = useContext(ChannelContext)
    const { profile, getProfile, allProfiles, getAllProfiles } = useContext(ProfileContext)

    const [channelInfo, setChannelInfo] = useState({ name: '', description: '', image: '' })
    const [channelMembers, setChannelMembers] = useState([])

    useEffect(getAllProfiles, [])
    useEffect(getProfile, [])

    const addMember = (memberId) => {
        const members = [...channelMembers]
        members.push(memberId)
        setChannelMembers(members)
    };

    const removeMember = (memberId) => {
        const members = [...channelMembers]
        members.pop(memberId)
        setChannelMembers(members)
    }


    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...channelInfo }
        formInfo[e.target.id] = e.target.value
        setChannelInfo(formInfo)
        };

    const handleFormSubmission = (e) => {
        e.preventDefault()
        createChannel(channelInfo)
        .then((res) => {
            createChannelMember(res.id, profile.id)
            channelMembers.forEach(memberId => {
                createChannelMember(res.id, memberId)
            })
        })
    };

    const getMember = (memberId) => {
        const channelMember = allProfiles.find((member) => memberId === member.id)
        if (channelMember)  { return (
        <span 
            className="selected-option"
            key={memberId}>
                {
                    memberId === profile.id
                    ? '*'
                    : <span className="mr-1 remove-selection-button" aria-hidden="true" onClick={() => {removeMember(memberId)}}>&times;</span>
                }
                
                {channelMember.full_name}
            </span>) }
    }

    const makeChannel = (e) => {
        e.preventDefault()
        createChannel(channelInfo)
            .then((res) => {
                createChannelMember(res.id, profile.id)
                channelMembers.forEach(memberId => {
                    createChannelMember(res.id, memberId)
                })
            })
    }



    return(
        <main className="channel-container px-3">
        <h3 className="mt-3 text-center">Create Channel</h3>
            <section>

            <div className="profile-form my-5" onSubmit={handleFormSubmission}>
                <div className="form-group">
                    <label htmlFor="name">Channel Name</label>
                    <input onChange={handleFormInput} type="text" id="name" className="form-control" value={channelInfo.name} required autoFocus />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description/Info</label>
                    <textarea onChange={handleFormInput} className="form-control" id="description" rows="3" value={channelInfo.description}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Channel Image URL</label>
                    <input onChange={handleFormInput} type="text" id="image" className="form-control" value={channelInfo.image} required autoFocus />
                </div>

                <div className="channel-members-selector pb-4">
                    <label htmlFor="members">Channel Members</label>
                    <div className="members list mb-2">
                        {[profile.id, ...channelMembers].map((m) => getMember(m))}
                    </div>
                    <MemberSelector options={allProfiles} selected={[...channelMembers, profile.id]} addSelection={addMember} />

                </div>

                <button className="btn btn-success w-100" onClick={handleFormSubmission}>Create Channel</button>
                <button className="btn btn-secondary w-100 mt-3" onClick={() => {props.history.push("/home")}}>Cancel</button>
            </div>
        </section>
    </main>
    )
}
