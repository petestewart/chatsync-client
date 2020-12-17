import React from 'react'
import dayjs from 'dayjs'


import './ChatMessage.css'


export const ChatMessage = (props) => {
    const { content, senderId, createdAt, full_name } = props.message;

    return (
        <div className="message row">
            <div className="col-1 message-avatar">ava</div>
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