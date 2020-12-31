import React, { useContext, useState } from "react"

import { AuthContext } from "../Auth/AuthProvider"

import "./ChatCalibrator.css"


export const ChatCalibrator = (props) => {
    // const [calibratorOpen, setCalibratorOpen] = useState(false)
    const [calibrationMessage, setCalibrationMessage] = useState('')

    const formInputHandler = (e) => {
        setCalibrationMessage(e.target.value)
    };

    return (
        <>

        {
            props.formOpen || props.calibratorOpen
            ? <div className={'calibrator'}>
            {
                props.formOpen
                ?   <div className="calibrator-form form-group">
                    <label htmlFor="calibrationMessage" className="text-center">Enter event message you'd like to use to calibrate everyone's chat feed with</label>
                        <div className="mx-3">
                        <small>Click when</small>
                        <textarea className="form-control" id="calibrationMessage" rows="4" placeholder="The game clock reaches 15:00" value={calibrationMessage} onChange={formInputHandler}></textarea>
                        {
                            calibrationMessage === ''
                            ? ''
                            : <button className="btn btn-primary w-100 mt-3" onClick={() => {
                                props.setFormOpen(false)
                                props.sendCalibrationCall({message: calibrationMessage})
                                }}>
                                    Start Calibration for Everyone
                                </button>
                        }
                            <button className="btn btn-secondary w-100 mt-3" onClick={() => {
                                setCalibrationMessage('')
                                props.setCalibratorOpen(false)
                                props.setFormOpen(false)}}>
                                    Cancel
                            </button>

                        </div>
                    </div>
                :   <div className="calibrator-live">
                    {props.calibrationMessage.full_name} 
                    <span> wants you to click 'Calibrate NOW' when this happens: </span> 
                    <h6 className="text-center">
                    {props.calibrationMessage.content}
                    </h6>
                    <button className="btn btn-danger w-100 mt-3" onClick={() => {
                        props.setCalibratorOpen(false)
                        props.sendCalibrationResponse(props.calibrationMessage.id)
                        }}>
                            Calibrate NOW!
                    </button>
                    <button className="btn btn-primary w-100 mt-3" onClick={() => {
                        props.setCalibratorOpen(false)
                        // props.sendCalibrationAnswer({message: calibrationMessage})
                        // calculate createdAt with calibrationMessage time
                        }}>
                            Keep current time offset
                    </button>
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
                        ? <div>{props.memberOffsets.map((m) => <small> {m.fullName}: {m.offsetAmount} seconds</small>)}</div>
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

