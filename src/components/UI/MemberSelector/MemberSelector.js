import React, { useState, useEffect } from 'react';

import "./MemberSelector.css"

export const MemberSelector = (props) => {

    
    const [textInput, setTextInput] = useState('')

    const [showOptions, setShowOptions] = useState(false)

    // shows menu options as long as something is typed in to the text input
    useEffect(() => {setShowOptions(textInput.length > 0)}, [textInput])

    const handleInput = (e) => {
        setTextInput(e.target.value)
    };

    const menuOptions = props.options.map((option) => 
        props.selected.includes(option.id) 
        ? ''
        :   <div className="dropdown-item w-100" 
                id={option.id}
                key={option.id}
                onClick={() => {
                    props.addSelection(option.id)
                    // setShowOptions(false)
                }} 
                >
                    {option.full_name}
            </div>
    )


    return (
        <div className="dropdown" >
            <form autoComplete="off" >

            <input 
                className="dropdown-toggle w-100" 
                type="div" 
                id="dropdownMenuButton" 
                onChange={handleInput}
                onClick={() => {setShowOptions(true)}}
                // onBlur={() => {setShowOptions(false)}} ** NEED TO FIND SOLUTION TO THIS
                />
            <div className={`selector-menu w-75 dropdown-menu${showOptions  ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            <span className="ml-1 selector-close-menu-button" aria-hidden="true" onClick={() => {setShowOptions(false)}}>&times;</span>
                {menuOptions}
            </div>
            </form>
        </div>
    )
};