import React, { useState } from "react"

import Backdrop from '../UI/Backdrop/Backdrop'

import "./ChatCalibrator.css"

export const ChatCalibrator = (props) => {
    const [calibrationMessage, setCalibrationMessage] = useState('')

    const formInputHandler = (e) => {
        setCalibrationMessage(e.target.value)
    };

    return (
        <>
        <Backdrop show={true} />

        {
            props.formOpen || props.calibratorOpen
            ? <div className='calibrator'>
            {
                props.formOpen
                ?   <div className="calibrator-form form-group">
                    <label htmlFor="calibrationMessage" className="text-center font-weight-bold">Enter the message you'd like to use to calibrate everyone's chat feed with:</label>
                        <div className="mx-3">
                        <small className="font-italic">"Click your button when...</small>
                        <textarea className="form-control" id="calibrationMessage" rows="4" placeholder="The game clock reaches 15:00" value={calibrationMessage} onChange={formInputHandler}></textarea>
                        {
                            calibrationMessage === ''
                            ? ''
                            : <button className="btn-sm btn-primary w-100 mt-3" onClick={() => {
                                props.setFormOpen(false)
                                props.sendCalibrationCall({message: calibrationMessage})
                                }}>
                                    Start Calibration for Everyone
                                </button>
                        }
                            <button className="btn-sm btn-secondary w-100 mt-3" onClick={() => {
                                setCalibrationMessage('')
                                props.setCalibratorOpen(false)
                                props.setFormOpen(false)}}>
                                    Cancel
                            </button>

                        </div>
                    </div>
                :   <div className="calibrator-live text-center">
                    <span className="font-weight-bold">
                        {`${props.calibrationMessage.full_name} `}  
                    </span>
                    wants you to click<br/> <span className="text-danger">'Calibrate NOW'</span> {'when '} <br />
                    <span className="font-weight-bold">
                    {props.calibrationMessage.content}
                    </span>
                    <button className="btn btn-danger w-100 mt-3" onClick={() => {
                        props.setCalibratorOpen(false)
                        props.sendCalibrationResponse(props.calibrationMessage.id)
                        }}>
                            Calibrate NOW!
                    </button>
                    {/* <button className="btn btn-primary w-100 mt-3" onClick={() => {
                        props.setCalibratorOpen(false)
                        }}>
                            Keep current time offset
                    </button> */}
                    <button className="btn btn-secondary w-100 mt-3" onClick={() => {
                        props.setCalibratorOpen(false)
                        // props.sendCalibrationAnswer({message: calibrationMessage})
                        // some type of do not participate message
                        }}>
                            Do not sync my feed
                    </button>
                    {
                        props.calibrationMessage.senderId === props.profile.id
                        ?   <button className="btn btn-dark w-100 mt-3" onClick={() => {
                                props.setCalibratorOpen(false)
                                props.deleteCalibration(props.calibrationMessage.id)
                            }}>
                                Cancel Calibration Request
                            </button>
                        : ''
                    }
                    {
                        props.memberOffsets.length > 0
                        ? <div>{props.memberOffsets.map((m, i) => <small key={i}> {m.fullName}: {m.offsetAmount} seconds</small>)}</div>
                        : ''
                    }
                    </div>
            }
            
        </div>
            : ''
        }

        </>

    )
}

