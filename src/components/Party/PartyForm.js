import React, { useContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import dayjs from 'dayjs'

import { MemberSelector } from '../UI/MemberSelector/MemberSelector'

import { ChannelContext } from "../Channel/ChannelProvider"
import { PartyContext } from "../Party/PartyProvider"
import { ProfileContext } from "../Profile/ProfileProvider"

var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const PartyForm = props => {

    const useQuery = () => new URLSearchParams(useLocation().search)

    const query = useQuery()

    const { getChannelsByMember, getChannel, channel } = useContext(ChannelContext)
    const { createParty, setPartyGuestList, party, getParty, deleteParty, updateParty } = useContext(PartyContext)
    const { profile, getProfile, allProfiles, getAllProfiles } = useContext(ProfileContext)

    const [userChannels, setUserChannels] = useState([])
    const [guests, setGuests] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    const [channelLocked, setChannelLocked] = useState(false)
    const [duration, setDuration] = useState(0.5)

    useEffect(() => {
        if(query.get("channel_id")) {
            setChannelLocked(true)
    }}, [])


    useEffect(() => {
        if (channelLocked) {
            getChannel(query.get("channel_id"))
                        .then((res) => {
                            setPartyInfo({ ...partyInfo, channel_id: query.get("channel_id") })
                            getAllProfiles()
                            console.log(res)
                            const autoGuests = []
                            res.members.forEach((member) => autoGuests.push(member.member_id))
                            setGuests(autoGuests)
                        })
                        .catch((err) => props.history.push("/parties/create"))
        }
    }, [channelLocked])


    const [partyInfo, setPartyInfo] = useState({
        title: '',
        description: '',
        datetime: '',
        datetime_end: '',
        is_public: true,
        channel_id: ''
    })

    const [datetimeInput, setDatetimeInput] = useState({
        date: '',
        time: ''
    })

    useEffect(() => {
        setEditMode(props.history.location.pathname.includes('edit'))
    }, [])


    useEffect(() => {
        const endTime = dayjs(partyInfo.datetime).add(duration, 'hour').format('YYYY-M-D HH:mm')
        setPartyInfo({...partyInfo, datetime_end: endTime})
    }, [duration, partyInfo.datetime])

    useEffect(() => {
        if (editMode) {
            getParty(props.match.params.id)
                .then((res) => {
                    let channel = ''
                    if (party.channel) {
                        channel = party.channel.id
                    }
                    setPartyInfo({
                        title: party.title,
                        description: party.description,
                        datetime: `${party.datetime.substring(0,10)} ${party.datetime.substring(11,16)}`,
                        datetime_end: `${party.datetime_end.substring(0,10)} ${party.datetime_end.substring(11,16)}`,
                        is_public: party.is_public,
                        id: party.id,
                        channel_id: channel
                    })
                    setDuration(
                        dayjs(party.datetime_end).diff(dayjs(party.datetime), 'hour', true)
                    )
                })
                .catch((err) => {
                    console.log(err)
                    props.history.push('/')
                })
        }
    }, [editMode, props.match.params.id])

    useEffect(() => {
        if (editMode && party) {
        const localTime = new Date(party.datetime)
        setDatetimeInput({
            date: dayjs(localTime).format('YYYY-MM-DD'),
            time: dayjs(localTime).format('HH:mm')
        })
    } else {
        const { date, time } = getCurrentDatetime()
        setDatetimeInput({ date, time })
    }
    }, [editMode])

    useEffect(() => {
        if (editMode && partyInfo.id) {
            const partyGuests = []
            party.guests.forEach((g) => {
                partyGuests.push(g.id)
            })
            setGuests(partyGuests)
        }
    }, [partyInfo.id])


    const orderedGuests = () => {
        if (allProfiles) {
            const sortedGuests = [...guests]
            sortedGuests.sort((a, b) => {
                const [guestA] = allProfiles.filter(m => m.id === a)
                const [guestB] = allProfiles.filter(m => m.id === b)
                if (guestA.full_name > guestB.full_name) {
                    return 1
                } else { return -1}
            })
            return(sortedGuests) 
        }
        
    }

    useEffect(() => {
        getProfile()
            .then(() => {
                if (profile.id) {
                    getChannelsByMember(profile.id)
                        .then((res) => setUserChannels(res))
                    setGuests([profile.id])
                }
            })
    }, [profile.id])




    // const [utcDatetime, setUtcDatetime] = useState('')

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
        const month = ('0' + (currentTime.getMonth() + 1)).substr(-2)
        const day = ('0' + currentTime.getDate()).substr(-2)
        const year = currentTime.getFullYear()
        const hours = ('0' + currentTime.getHours()).substr(-2)
        const minutes = ('0' + currentTime.getMinutes()).substr(-2)
        const date = (year + '-' + month + '-' + day)
        const time = (hours + ':' + minutes)
        const datetime = `${date} ${time}`
        return({ datetime, date, time })
    };

    // useEffect(() => {
    //     const { date, time } = getCurrentDatetime()
    //     setDatetimeInput({ date, time })
    // }, [])

    useEffect(getAllProfiles, [])

    const addGuest = (guest) => {
        setGuests([...guests, guest])
    };

    const removeGuest = (guest) => {
        setGuests([...guests].filter(g => g !== guest))
    };

    
    const handleFormInput = (e) => {
        e.preventDefault()
        const formInfo =  { ...partyInfo }
        formInfo[e.target.id] = e.target.value
        setPartyInfo(formInfo)
        };

    const handleChannelSelection = (e) => {
        setPartyInfo({ ...partyInfo, channel_id: e.target.value })
        if (e.target.value !== '') {
            getChannel(e.target.value)
                        .then((res) => {
                            // console.log(res)
                            const autoGuests = []
                            res.members.forEach((member) => autoGuests.push(member.member_id))
                            setGuests(autoGuests)
                        })
        }
    };

    const handlePublicCheckbox = (e) => {
        setPartyInfo({ ...partyInfo, is_public: e.target.checked })
    };

    const handleFormSubmission = (e) => {
        console.log('handleFormSubmission')
        e.preventDefault()
        const party = {...partyInfo}
        if (partyInfo.channel_id) {
            party.channel_id = Number(partyInfo.channel_id)
        } else {
            party.channel_id = null
        }
        if (editMode) {
            updateParty(party)
                .then((res) => {
                    setPartyGuestList(party.id, guests)
                    props.history.goBack()
                })
        } else {
            createParty(party)
                .then((res) => {
                    setPartyGuestList(res.id, guests)
                    props.history.push("/parties/upcoming")
                }) 
        }
        
    };

    const handleDateTimeInput = (e) => {
        const dateTimeValues = { ...datetimeInput }
        dateTimeValues[e.target.id] = e.target.value
        setDatetimeInput(dateTimeValues)
    };

    const handleDurationInput = (e) => {
        setDuration(e.target.value)
    }

    useEffect(() => {
        const utcDatetimeValue = getUTCDatetime()
        setPartyInfo({ ...partyInfo, datetime: utcDatetimeValue})
    }, [datetimeInput])

    const guestIcon = (guestId) => {
        const guest = allProfiles.find((member) => guestId === member.id)
        if (guest)  { return (
        <span 
            className="selected-option"
            key={guestId}>
                <span className="mr-1 remove-selection-button" aria-hidden="true" onClick={() => {removeGuest(guestId)}}>&times;</span>
                {guest.full_name}
            </span>) }
    };

    const testFunction = () => { return ('test response')};

    return (
        <main className="profile-container px-3">
        <h3 className="mt-3 text-center">{ editMode ? 'Edit' : 'Create'} { channelLocked ? `#${channel.name}` : '' } Party</h3>
            <section>
            <div className="form-group guests-selector">
                    <label htmlFor="guests">Guests</label>
                    <div className="guest-list mb-2">
                        {orderedGuests().map((m) => guestIcon(m))}
                    </div>
                    <MemberSelector 
                        options={allProfiles} 
                        selected={guests} 
                        addSelection={addGuest} />
                </div>

            <form className="profile-form my-5" >
                <div className="form-group">
                    <label htmlFor="title">Name Of Event</label>
                    <input onChange={handleFormInput} type="text" id="title" className="form-control" value={partyInfo.title} required autoFocus />
                </div>
                {
                    userChannels.length > 0 && !channelLocked
                    ?    <div className="form-group">
                            <label htmlFor="channel_id">Channel:</label>
                            <select className="ml-2" name="channel_id" id="channel_id" value={partyInfo.channel_id} onChange={handleChannelSelection}>
                                <option key={0} value=''>none</option>
                                {userChannels.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    :   ''
                }
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input onChange={handleDateTimeInput} type="date" id="date" className="form-control" value={datetimeInput.date} required />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="time">Start Time</label>
                    <input onChange={handleDateTimeInput} type="time" id="time" className="form-control" value={datetimeInput.time} required />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="time">End Time</label>
                    
                    <select id="inputState" className="form-control" onChange={handleDurationInput} value={duration}>
                        {[...new Array(48)].map((d, i) => (
                            <option key={i} value={(i+1)/2}>{
                                `${dayjs(`${datetimeInput.date} ${datetimeInput.time}`).add(((i+1)/2), 'hour').format('hh:mm')} (${(i+1)/2} hours)`
                                }</option>
                        ))}
                    </select>


                    {/* <input onChange={handleEndTimeInput} type="time" id="time" className="form-control" value={duration} required /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Event Description and Info</label>
                    <textarea onChange={handleFormInput} className="form-control" id="description" rows="3" value={partyInfo.description}></textarea>
                </div>
                <div className="form-group form-check d-flex align-items-center mb-2">
                    <input onChange={handlePublicCheckbox} type="checkbox" className="form-check-input" id="is_public" checked={partyInfo.is_public}/>
                    <label className="form-check-label" htmlFor="is_public"><small>Public Event (Anyone with link may attend)</small></label>
                </div>
                {
                    showDeleteWarning
                    ?   ''
                    :   <>
                            <button className="btn btn-success w-100" onClick={handleFormSubmission}> 
                                { editMode ? 'Update' : 'Create' } { channelLocked ? `#${channel.name}` : '' } WatchParty
                            </button>
            
                            <button className="btn btn-secondary w-100 mt-3" onClick={() => {props.history.goBack()}}>Cancel</button>
            
                            {
                                editMode && party.creator.id === profile.id
                                ? <button className="btn btn-outline-danger w-100 mt-3 mb-3" onClick={() => {setShowDeleteWarning(true)}}>Delete Event</button>
                                : ''
                            }
                        </>
                }
            </form>
            {
                showDeleteWarning
                ? <div className="alert alert-danger mt-3" role="alert">
                    Delete this event?
                    <button className="btn-sm btn-danger ml-3"
                        onClick={() => deleteParty(party.id).then(() => {props.history.push("/parties/upcoming")})}> 
                        Delete
                    </button>
                    <button className="btn-sm btn-light ml-3"
                        onClick={() => {setShowDeleteWarning(false)}}>
                        Cancel
                    </button>
                </div>
                : ''
            }
        </section>
    </main>
    )
}