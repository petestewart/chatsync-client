import React, { useState } from 'react';

export const MemberSelector = (props) => {

    
    const [textInput, setTextInput] = useState('')

    const handleInput = (e) => {
        setTextInput(e.target.value)
    };

    const menuOptions = props.options.map((option) => 
        props.selected.includes(option.id) 
        ? ''
        : <div className="dropdown-item w-100" id={option.id} key={option.id} onClick={() => {props.addSelection(option.id)}} >{option.full_name}</div>
    )


    return (
        <>
        <div class="dropdown">
            <input 
                class="dropdown-toggle" 
                type="div" 
                id="dropdownMenuButton" 
                onChange={handleInput}
            />
            <div class={`dropdown-menu${textInput === '' ? ' ' : 'show'}`} aria-labelledby="dropdownMenuButton">
                {menuOptions}
                {/* <span className="dropdown-item">Action</span>
                <span className="dropdown-item">Another action</span>
                <span className="dropdown-item">Something else here</span> */}
            </div>
        </div>
        <h1>morestuff</h1>
        </>
    )
};