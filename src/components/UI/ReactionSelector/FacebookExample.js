    import 'emoji-mart/css/emoji-mart.css'
    import { Picker } from 'emoji-mart'

    import './reactions.css'

    export const FacebookExample = (props) => {
    const customReactionEmojis = [
        {
            name: '+1',
            short_names: ['+1'],
            text: '',
            emoticons: [],
            keywords: ['thumbsup'],
        },
        {
            name: '-1',
            short_names: ['-1'],
            text: '',
            emoticons: [],
            keywords: ['thumbsdown'],
        },
        {
            name: 'heart',
            short_names: ['heart'],
            text: '',
            emoticons: [],
            keywords: ['heart','love'],
        },
        {
            name: 'clap',
            short_names: ['clap'],
            text: '',
            emoticons: [],
            keywords: ['clap'],
        },
        {
            name: 'laughing',
            short_names: ['laughing'],
            text: '',
            emoticons: [],
            keywords: ['lol', 'laughing'],
        },
        {
            name: 'cry',
            short_names: ['cry'],
            text: '',
            emoticons: [],
            keywords: ['cry'],
        },
        {
            name: '100',
            short_names: ['100'],
            text: '',
            emoticons: [],
            keywords: ['100'],
        },
        {
            name: 'fire',
            short_names: ['fire'],
            text: '',
            emoticons: [],
            keywords: ['fire'],
        },
        {
            name: 'raised_hands',
            short_names: ['raised_hands'],
            text: '',
            emoticons: [],
            keywords: ['raised_hands'],
        },
        ]


    return (
    <div className="reactions">



<Picker
  showPreview={false}
  showSkinTones={false}
  include={['custom']}
  custom={customReactionEmojis}
  emojiSize={12}
/>

    </div>

    )}