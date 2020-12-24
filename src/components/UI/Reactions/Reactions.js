
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'


export const Reactions = (props) => (
    <div>
    <Emoji emoji={props.emoji} size={12} onClick={props.click} />
        </div>
)