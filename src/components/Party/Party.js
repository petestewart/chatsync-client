import React, { useContext, useState, useEffect } from "react"
import dayjs from 'dayjs'

import { PartyContext } from "../Party/PartyProvider"

import { ChatRoom } from "../ChatRoom/ChatRoom"
import { InviteForm } from "../UI/InviteForm/InviteForm"
import { ShareModal } from "../UI/ShareModal/ShareModal"

import "./Party.css"

export const Party = props => {
    const { getParty, party } = useContext(PartyContext)
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
        setPartyIsLive(
            (dayjs(party.datetime).valueOf()) <= (dayjs(new Date()).valueOf())
            && 
            (dayjs(party.datetime_end).valueOf()) >= (dayjs(new Date()).valueOf())
        )}, [party])

    // const offsetInputHandler = (e) => {
    //     setTimeOffset(e.target.value)
    // };


    return (
        <main className="party-container">
            <div className="party-header">
                <h3 className="mt-3 mb-0 text-center">{party.title}</h3>
                {/* {
                    party.channel
                    ? <div className="text-center"><small>#{party.channel.name}</small></div>
                    : ''
                } */}
                <h6 className={`mb-0 text-center ${partyIsLive ? 'text-primary' : ''}`}>
                    {partyIsLive
                    ? 'LIVE '
                    : ''}
                    {
                    party.channel
                    ? `#${party.channel.name} `
                    : ''
                    }
                    Watch Party</h6>
                <div className="text-center ">
                    <small>
                    {party.description}
                    
                    </small>
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
                                {/* <input type="number" id="offset" onChange={offsetInputHandler}></input> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center text-success">
                                {
                                    showShareMsg
                                    ? <ShareModal 
                                        link={`http://localhost8000.com/party/${party.id}`}
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