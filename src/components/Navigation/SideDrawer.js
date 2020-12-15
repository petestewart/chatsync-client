import React from "react"

import "./SideDrawer.css"

export const SideDrawer = (props) => {
    return (
        <div className={`sidedrawer ${props.open ? 'sidedrawer-open' : 'sidedrawer-closed'}`}>
            <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
            </ul>
        </div>
    )
}
