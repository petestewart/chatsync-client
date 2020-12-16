import React from 'react';

import './PartyCard.css'

export const PartyCard = (props) => (
    <div className="party-card card">
        <div className="card-body">
            <h5 className="card-title">{props.party.title}</h5>
            <p className="card-text">{props.party.datetime}</p>
            {props.party.description}
        </div>
    </div>
);