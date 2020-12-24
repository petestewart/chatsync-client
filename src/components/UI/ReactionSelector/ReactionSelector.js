import React, { useState, useEffect } from "react"
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import './reactions.css'

export const ReactionSelector = (props) => {

// const customReactionEmojis = [
//     {
//         name: '+1',
//         short_names: ['+1'],
//     },
//     {
//         name: '-1',
//         short_names: ['-1'],
//     },
//     {
//         name: 'heart',
//         short_names: ['heart'],
//     },
//     {
//         name: 'clap',
//         short_names: ['clap'],
//     },
//     {
//         name: 'laughing',
//         short_names: ['laughing'],
//     },
//     {
//         name: 'cry',
//         short_names: ['cry'],
//     },
//     {
//         name: '100',
//         short_names: ['100'],
//     },
//     {
//         name: 'fire',
//         short_names: ['fire'],
//     },
//     {
//         name: 'raised_hands',
//         short_names: ['raised_hands'],
//     },
//     ]


return (
    <div className="reactions">

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
