
import 'emoji-mart/css/emoji-mart.css'
import { Emoji } from 'emoji-mart'
import { useEffect, useState } from 'react'


export const Reactions = (props) => {
    const [reactions, setReactions] = useState([])

    useEffect(() => {
        setReactions(props.messageReactions.map(r => r.reaction.id))
    }, [props.messageReactions])

        //count is the length of the filtered array for each id in reactions
    
    return (

    <div>
        {
            [...new Set(reactions)].map((e, index) => 
            <span className="mr-2" key={index}>
                <Emoji 
                emoji={props.reactionTypes.find(rt => rt.id === e).name} 
                size={12}
                onClick={props.click}
                
                />
                <small>{reactions.filter(r => r === e).length} </small>
            </span>
            )
        }
        </div>
    )
}