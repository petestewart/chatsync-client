import React, { useContext, useState, useEffect } from "react"

import { PartyContext } from "../Party/PartyProvider"

export const PartyForm = props => {
    const { createParty, getParty, updateParty } = useContext(PartyContext)

    const [partyInfo, setPartyInfo] = useState({
        title: '',
        description: '',
        datetime: '',
        is_public: true
    })

    const [datetimeInput, setDatetimeInput] = useState({
        date: '',
        time: ''
    })

    const [utcDatetime, setUtcDatetime] = useState('')

    const getUTCDatetime = () => {
        // create Date object from user form (local time)
        const dateTime = new Date()
        dateTime.setFullYear(parseInt(datetimeInput.date.substring(0,4)))
        dateTime.setMonth(parseInt(datetimeInput.date.substring(5,7))-1)
        dateTime.setDate(parseInt(datetimeInput.date.substring(8)))
        dateTime.setHours(parseInt(datetimeInput.time.substring(0,2)))
        dateTime.setMinutes(parseInt(datetimeInput.time.substring(3)))
        // create UTC datetime string from local Date object
        const utcYear = dateTime.getUTCFullYear()
        const utcMonth = dateTime.getUTCMonth()+1
        const utcDay = dateTime.getUTCDate()
        const utcHours = ('0' + dateTime.getUTCHours()).substr(-2)
        const utcMinutes = ('0' + dateTime.getUTCMinutes()).substr(-2)
        const utcDate = (utcYear + '-' + utcMonth + '-' + utcDay)
        const utcTime = (utcHours + ':' + utcMinutes)
        // return UTC datetime string
        return(`${utcDate} ${utcTime}`)
    };

    const getCurrentDatetime = () => {
        const currentTime = new Date()
        const month = currentTime.getMonth() + 1
        const day = currentTime.getDate()
        const year = currentTime.getFullYear()
        const hours = ('0' + currentTime.getHours()).substr(-2)
        const minutes = ('0' + currentTime.getMinutes()).substr(-2)
        const date = (year + '-' + month + '-' + day)
        const time = (hours + ':' + minutes)
        const datetime = `${date} ${time}`
        return({ datetime, date, time })
    };

    useEffect(() => {
        const { date, time } = getCurrentDatetime()
        setDatetimeInput({ date, time })
    }, [])

    
    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...partyInfo }
        formInfo[e.target.id] = e.target.value
        setPartyInfo(formInfo)
        };

    const handlePublicCheckbox = (e) => {
        setPartyInfo({ ...partyInfo, is_public: e.target.checked })
    };

    const handleFormSubmission = (e) => {
        e.preventDefault()
        createParty(partyInfo)
            .then(() => {props.history.push("/profile")})
    };

    const handleDateTimeInput = (e) => {
        const dateTimeValues = { ...datetimeInput }
        dateTimeValues[e.target.id] = e.target.value
        setDatetimeInput(dateTimeValues)
    };

    useEffect(() => {
        const utcDatetimeValue = getUTCDatetime()
        setPartyInfo({ ...partyInfo, datetime: utcDatetimeValue})
    }, [datetimeInput])


    return (
        <main className="profile-container px-3">
        <h3 className="mt-3 text-center">Create Party</h3>
            <section>

            <form className="profile-form my-5" onSubmit={handleFormSubmission}>
                <div className="form-group">
                    <label htmlFor="title">Name Of Event</label>
                    <input onChange={handleFormInput} type="text" id="title" className="form-control" value={partyInfo.title} required autoFocus />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input onChange={handleDateTimeInput} type="date" id="date" className="form-control" value={datetimeInput.date} required />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="time">Time</label>
                    <input onChange={handleDateTimeInput} type="time" id="time" className="form-control" value={datetimeInput.time} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Event Description and Info</label>
                    <textarea onChange={handleFormInput} className="form-control" id="description" rows="3" value={partyInfo.description}></textarea>
                </div>
                <div className="form-group form-check d-flex align-items-center mb-5">
                    <input onChange={handlePublicCheckbox} type="checkbox" className="form-check-input" id="is_public" checked={partyInfo.is_public}/>
                    <label className="form-check-label" htmlFor="is_public"><small>Public Event (Anyone with link may attend)</small></label>
                </div>

                <button className="btn btn-success w-100" onClick={handleFormSubmission}>Create WatchParty</button>
                <button className="btn btn-secondary w-100 mt-3" onClick={() => {props.history.push("/")}}>Cancel</button>
            </form>
        </section>
    </main>
    )
}