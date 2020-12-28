import React, { useEffect, useRef } from "react"
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import './reactions.css'

export const ReactionSelector = (props) => {

    const livePicker = useRef()


    useEffect(() => {
        livePicker.current.scrollIntoView({ behavior: 'smooth' })
    }, [livePicker])

    return (
        <div className="reactions" ref={livePicker}>

            <Picker
            showPreview={false}
            showSkinTones={false}
            include={['custom']}
            custom={props.reactionTypes}
            emojiSize={18}
            onSelect={props.handleReactionSelect}
            />
        </div>
)}

