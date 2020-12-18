import React from 'react'
import dayjs from 'dayjs'
import * as Avatar from '@radix-ui/react-avatar';


import './ChatMessage.css'


export const ChatMessage = (props) => {
    const { content, senderId, createdAt, full_name, profile_pic } = props.message;

    

    return (
        <div className="message row">
            <div className="col-1">
            <img className="message-avatar" 
                src={profile_pic
                    ? profile_pic
                    : 'https://www.clipartmax.com/png/middle/97-978328_avatar-icon-free-fa-user-circle-o.png'} 
                    alt={full_name}/>
            </div>
            <div className="col-11">
                <span className="message-sender">{full_name} </span> 
                <small>
                    {createdAt 
                        ? dayjs(createdAt.toDate()).format('MM/D/YY  h:mmA')
                        : ''
                    }
                </small>
                <p>{content}</p>
            </div>
        </div>
    )
}