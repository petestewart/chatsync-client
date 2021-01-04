import React from 'react';
import dayjs from 'dayjs'


import './PartyCard.css'

export const PartyCard = (props) => {

    const happeningNow = (
        (dayjs(props.party.datetime).valueOf()) <= (dayjs(new Date()).valueOf())
            && 
        (dayjs(props.party.datetime_end).valueOf()) >= (dayjs(new Date()).valueOf())
    )

    return (
    <div className="party-card card mb-3">
        <div className="card-body" onClick={() => {props.history.push(`/party/${props.party.id}`)}}>
            <h5 className={`card-title ${happeningNow ? 'text-danger' : ''}`}>
                {props.party.title} {happeningNow ? <small> -- NOW LIVE!</small> : ''}
            </h5>
            <p className="card-text">{dayjs(props.party.datetime).format('dddd MMMM D, YYYY  h:mmA')}</p>
            <p className="card-text">{props.party.description}</p>
            {props.party.channel
            ? <><img className="party-avatar" src={props.party.channel.image} alt="channel" /> <small className="text-secondary">#{props.party.channel.name} </small> </>
            : ' '
            }
            {/* {props.party.rsvp
            ? <><i className="fas fa-calendar-check text-success"></i> <small className="text-secondary">Attending </small> </>
            : <><i className="fas fa-calendar-times"></i> <small>Not Attending </small></>
            } */}

        </div>
    </div>
)};