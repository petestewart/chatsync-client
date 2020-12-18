import React, { useEffect, useState, useRef } from 'react'
import dayjs from 'dayjs'


import './ChatMessage.css'


export const ChatMessage = (props) => {
    const { content, senderId, createdAt, full_name, profile_pic, id } = props.message;

    const [showEditMenu, setShowEditMenu] = useState(false);
    const [editMessage, setEditMessage] = useState(false);

    

    const MessageForm = (props) => {
        const inputRef = useRef(null);
        const [newMessageContent, setNewMessageContent] = useState(props.origMessage)

        useEffect(() => {
            // Moving cursor to the end
            inputRef.current.selectionStart = inputRef.current.value.length;
            inputRef.current.selectionEnd = inputRef.current.value.length;
        }, []);

        const handleFormData = (e) => {
            setNewMessageContent(e.target.value)
        };

        const handleKeystroke = (e) => {
            // update message if user presses return
            if (e.keyCode === 13 && e.shiftKey === false) {
                props.updateMessage(id, newMessageContent)
                setEditMessage(false)
            }
            // cancel if user presses ESC
            if (e.keyCode === 27) {
                setEditMessage(false)
            }
        };

        return (
        <div>
            <textarea
                ref={inputRef}
                className="w-100 edit-message-textbox" 
                type="text" 
                value={newMessageContent} 
                onChange={handleFormData} onKeyDown={handleKeystroke}
                onBlur={() => {
                    setEditMessage(false)
                }}
                autoFocus
                />
            
        </div>

        )
    }

    return (
        <div className="message row">
            <div className="col-1">
            <img className="message-avatar" 
                src={profile_pic
                    ? profile_pic
                    : 'https://www.clipartmax.com/png/middle/97-978328_avatar-icon-free-fa-user-circle-o.png'} 
                    alt={full_name}/>
            </div>
            <div className="col-9">
                <span className="message-sender">{full_name} </span> 
                <small>
                    {createdAt 
                        ? dayjs(createdAt.toDate()).format('MM/D/YY h:mmA')
                        : ''
                    }
                </small>
                
                { editMessage
                ?   <MessageForm origMessage={content} updateMessage={props.updateMessage} />
                : <p>{content}</p>
                }
                
            </div>
            <div className="col-2 text-right">
                    { showEditMenu
                    ? <span className="message-edit-controls">
                        <i className="fas fa-smile mr-3 react-to-message-button"></i>
                        { senderId === props.readerId
                            ? <>
                                <i className="far fa-trash-alt mr-3 delete-message-button" onClick={() => {props.deleteMessage(props.message.id)}}></i>
                                <i className="far fa-edit mr-3 edit-message-button" 
                                    onClick= {() => {
                                        setEditMessage(true)
                                        setShowEditMenu(false)
                                        }}></i>
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