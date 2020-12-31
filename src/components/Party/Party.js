import React, { useContext, useState, useEffect } from "react"
import dayjs from 'dayjs'

import { PartyContext } from "../Party/PartyProvider"

import { ChatRoom } from "../ChatRoom/ChatRoom"
// import { ChatCalibrator } from "../ChatRoom/ChatCalibrator"
import { InviteForm } from "../UI/InviteForm/InviteForm"
import { PartyForm } from "../Party/PartyForm"

import "./Party.css"

export const Party = props => {
    const { getParty, party } = useContext(PartyContext)
    const [showInviteForm, setShowInviteForm] = useState(false)

    const [partyIsLive, setPartyIsLive] = useState(false)

    const [showCalibrationForm, setShowCalibrationForm] = useState(false)
    const [showCalibrator, setShowCalibrator] = useState(false)


    const [timeOffset, setTimeOffset] = useState(0)


    useEffect(() => {
        getParty(props.match.params.id)
    }, [])

    useEffect(() => {
        setPartyIsLive(
            (dayjs(party.datetime).valueOf()) <= (dayjs(new Date()).valueOf())
        )}, [party])

    const offsetInputHandler = (e) => {
        setTimeOffset(e.target.value)
    };


    return (
        <main className="party-container">
            <div className="party-header">
                <h2 className="mt-3 text-center">{party.title}</h2>
                <h6 className={`text-center ${partyIsLive ? 'text-primary' : ''}`}>
                    {partyIsLive
                    ? 'LIVE '
                    : ''}
                    Watch Party</h6>
                
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 text-left">
                                <i className="fas fa-users party-control-button" onClick={() => {setShowInviteForm(!showInviteForm)}}></i>
                            </div>
                            <div className="col-8 text-center">
                                {party.description}
                            </div>
                            <div className="col-2 text-right">
                                <i className="fas fa-cog party-control-button" onClick={() => setShowCalibrationForm(!showCalibrationForm)}></i>
                                <input type="number" id="offset" onChange={offsetInputHandler}></input>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-3">
                    {
                        showInviteForm
                        ? <InviteForm party={party} />
                        : ''
                    }
                </section>
            </div>
            <section className="party-room-body">
                {/* <ChatCalibrator formOpen={showCalibrationForm} setFormOpen={setShowCalibrationForm} calibratorOpen={showCalibrator} setCalibratorOpen={setShowCalibrator}/> */}
                <ChatRoom party={party} timeOffset={timeOffset * 1000} setTimeOffset={setTimeOffset} showCalibrationForm={showCalibrationForm} setShowCalibrationForm={setShowCalibrationForm} showCalibrator={showCalibrator} setShowCalibrator={setShowCalibrator}/>
            </section>
        </main>
            
    )
}