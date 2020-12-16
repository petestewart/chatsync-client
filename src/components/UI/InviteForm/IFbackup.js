import React, { useContext, useState, useEffect } from "react"
// import Select from 'react-select';

import SelectSearch from 'react-select-search';


import { ProfileContext } from "../../Profile/ProfileProvider"

// import { MemberSelector } from '../MemberSelector/MemberSelector'


import "./InviteForm.css"


export const InviteForm = props => {
    const [guests, setGuests] = useState([])
    const { getAllProfiles, allProfiles } = useContext(ProfileContext)

    const [ menuOptions, setMenuOptions ] = useState([])

    // useEffect(getAllProfiles, [])

    useEffect(() => {
        getAllProfiles()
        .then((res) => {setMenuOptions(res)})
    }, [])

    // useEffect(() => {setGuests([...allProfiles])}, [])

    const handleChange = (selectedOption) => {
        setGuests(selectedOption)
        console.log(`Option selected:`, selectedOption)
    }

    function renderFriend(props, option, snapshot, className) {
        const imgStyle = {
            borderRadius: '50%',
            verticalAlign: 'middle',
            marginRight: 10,
        };
    }

    const options = [
        {name: 'Swedish', value: 'sv'},
        {name: 'English', value: 'en'},
        {
            type: 'group',
            name: 'Group name',
            items: [
                {name: 'Spanish', value: 'es'},
            ]
        },
    ];

    return (
        <main className="inviteform-container px-3">
            <h2 className="mt-3 text-center">Invite Guests to PARTY</h2>
            <section className="mt-5">

            <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" />



            {/* <Select
            value={guests}
            onChange={handleChange}
            options={menuOptions}
            isMulti={true}
            getOptionLabel={option => option.full_name}
        /> */}
            </section>
        </main>
            
    )
}