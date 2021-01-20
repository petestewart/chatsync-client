import React, { useState } from 'react';

import "./MemberSelector.css"

export const MemberSelector = (props) => {

    
    const [textInput, setTextInput] = useState('')

    const [showOptions, setShowOptions] = useState(false)

    const handleInput = (e) => {
        setTextInput(e.target.value)
    };

    const menuOptions = props.options.map((option) => 
        props.selected.includes(option.id) 
        ? ''
        :   textInput === '' || option.full_name.toLowerCase().includes(textInput.toLowerCase())
            ?   <div className="dropdown-item w-100" 
                    id={option.id}
                    key={option.id}
                    onClick={() => {
                        props.addSelection(option.id)
                    }} 
                >
                    {option.full_name}
                </div>
            : ''
    )


    return (
        <div className="dropdown" >
            <form autoComplete="off" >

            <input 
                className="selector-input dropdown-toggle w-100" 
                type="div" 
                id="dropdownMenuButton" 
                defaultValue={""}
                onChange={handleInput}
                onClick={() => {setShowOptions(true)}}
                // onBlur={() => {setShowOptions(false)}} 
                // ** TODO: onBlur doesn't work here, so find another solution to close selector when user clicks elsewhere
                />
            <div className={`selector-menu w-75 dropdown-menu${showOptions  ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            <span className="ml-1 selector-close-menu-button" aria-hidden="true" onClick={() => {setShowOptions(false)}}>&times;</span>
                {menuOptions}
            </div>
            </form>
        </div>
    )
};