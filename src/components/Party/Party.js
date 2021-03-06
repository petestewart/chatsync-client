import React, { useContext, useState, useEffect } from "react"
import dayjs from 'dayjs'

import { PartyContext } from "../Party/PartyProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

import { ChatRoom } from "../ChatRoom/ChatRoom"
import { InviteForm } from "../UI/InviteForm/InviteForm"
import { ShareModal } from "../UI/ShareModal/ShareModal"

import "./Party.css"

import apiKeys from '../../helpers/apiKeys.json';

const baseURL = apiKeys.chatSyncClient.baseURL;

export const Party = props => {
    const { getParty, party } = useContext(PartyContext)
    const { profile } = useContext(ProfileContext)
    const [showInviteForm, setShowInviteForm] = useState(false)

    const [partyIsLive, setPartyIsLive] = useState(false)

    const [showCalibrationForm, setShowCalibrationForm] = useState(false)
    const [showCalibrator, setShowCalibrator] = useState(false)


    const [timeOffset, setTimeOffset] = useState(0)
    const [showShareMsg, setShowShareMsg] = useState(false)


    useEffect(() => {
        getParty(props.match.params.id)
    }, [])

    useEffect(() => {
        if (profile && party && party.guests && !party.is_public && !party.guests.map(g => g.id).includes(profile.id)) {
            props.history.push('/party/restricted_access')
        }
    }, [party, profile])

    useEffect(() => {
        setPartyIsLive(
            (dayjs(party.datetime).valueOf()) <= (dayjs(new Date()).valueOf())
            && 
            (dayjs(party.datetime_end).valueOf()) >= (dayjs(new Date()).valueOf())
        )}, [party])

    return (
        <main className="party-container">
            <div className="party-header">
                <div className="party-title mt-2 d-flex justify-content-between px-1">

                    <h4 className="mt-0 mb-0 text-center text-warning">
                    
                    {party.title}</h4>
                
                <div className="m-0 text-center d-flex justify-content-between">
                    <div className="channel-area text-center">
                    {
                    party.channel
                    ?   <>
                        { party.channel.image ? <img className="party-avatar" src={party.channel.image} alt="channel" /> : '' }
                        </>
                    : ''
                    }
                    </div>
                    <div className="event-name-area">

                <small className="party-tiny-header">
                {partyIsLive
                    ? <span className="text-primary">LIVE: </span>
                    : ''}
                    {dayjs(party.datetime).format(' M/D/YY h:mma ')} - {dayjs(party.datetime_end).format(' h:mma')}</small>
                    </div>

                    <div className="live-notice-area">
                        
                    </div>
                </div>
                </div>
                
                <section className="mt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 text-left">
                                <i className="fas fa-users party-control-button" 
                                onClick={() => {setShowInviteForm(!showInviteForm)}}></i>
                            </div>
                            <div className="col-4 text-center party-control-button">
                                <i className="fas fa-share-square"
                                onClick={() => setShowShareMsg(true)}></i>
                            </div>
                            <div className="col-4 text-center">
                                <i className={`fas fa-stopwatch party-control-button ${timeOffset ? 'text-success' : ''}`}
                                onClick={() => setShowCalibrationForm(!showCalibrationForm)}></i>
                            </div>
                            <div className="col-2 text-right">
                                <i className="fas fa-cog party-control-button" 
                                onClick={() => props.history.push(`/party/edit/${party.id}`)}></i>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center text-success feed-delay-message" sttyle={{ backgroundColor: '#1B1D21' }}>
                                {
                                    showShareMsg
                                    ? <ShareModal 
                                        link={`${baseURL}/party/${party.id}`}
                                        handleClose={() => {setShowShareMsg(false)}}
                                        />
                                    : ''
                                }
                                
                            <small>
                                {
                                timeOffset
                                ? `Feed delay: ${timeOffset} second${timeOffset !== 1 ? 's' : ''}`
                                : ''
                                }
                            </small>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-3">
                    {
                        showInviteForm
                        ? <InviteForm party={party} setShowInviteForm={setShowInviteForm} showInviteForm={showInviteForm} />
                        : ''
                    }
                </section>
            </div>
            <section className="party-room-body">
                <ChatRoom party={party} timeOffset={timeOffset * 1000} setTimeOffset={setTimeOffset} showCalibrationForm={showCalibrationForm} setShowCalibrationForm={setShowCalibrationForm} showCalibrator={showCalibrator} setShowCalibrator={setShowCalibrator}/>
            </section>
        </main>
            
    )
}