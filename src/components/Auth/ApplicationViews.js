import React from "react"
import { Route } from "react-router-dom"

import { ProfileProvider } from '../Profile/ProfileProvider'
import { ProfileForm } from "../Profile/ProfileForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <ProfileProvider>
                <Route exact path="/profile/edit" render={ props => <ProfileForm history={props.history} {...props} />} />

                {/* Home */}
                {/* Edit Profile */}
                <Route exact path="/" render={ props => { return <h1>HOME</h1>}} />
            </ProfileProvider>
        </>
    )
};