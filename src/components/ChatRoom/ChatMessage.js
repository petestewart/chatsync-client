import React, { useState } from 'react'
import dayjs from 'dayjs'
import * as Avatar from '@radix-ui/react-avatar';


import './ChatMessage.css'


export const ChatMessage = (props) => {
    const { content, senderId, createdAt, full_name, profile_pic } = props.message;

    const [showEditMenu, setShowEditMenu] = useState(false);

    

    return (
        <div className="message row">
            <div className="col-1">
            <img className="message-avatar" 
                src={profile_pic
                    ? profile_pic
                    : 'https://www.clipartmax.com/png/middle/97-978328_avatar-icon-free-fa-user-circle-o.png'} 
                    alt={full_name}/>
            </div>
            <div className="col-6">
                <span className="message-sender">{full_name} </span> 
                <small>
                    {createdAt 
                        ? dayjs(createdAt.toDate()).format('MM/D/YY h:mmA')
                        : ''
                    }
                </small>
                <p>{content}</p>
            </div>
            <div className="col-5 text-right">
                    { showEditMenu
                    ? <span className="message-edit-controls">
                        <i className="fas fa-smile mr-3 react-to-message-button"></i>
                        { senderId === props.readerId
                            ? <>
                                <i className="far fa-trash-alt mr-3 delete-message-button" onClick={() => {props.deleteMessage(props.message.id)}}></i>
                                <i class="far fa-edit mr-3 edit-message-button"></i>
                            </>
                            : ''
                        }
                    </span>
                    : ''
                    }
                        <i className="fas fa-ellipsis-v text-secondary message-open-controls-button" onClick={() => {setShowEditMenu(!showEditMenu)}}></i>
            </div>
        </div>
    )
}