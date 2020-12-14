import React from "react"
import { Route } from "react-router-dom"

import { ProfileProvider } from '../Profile/ProfileProvider'
import { Profile } from "../Profile/Profile"
import { ProfileForm } from "../Profile/ProfileForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <ProfileProvider>
                {/* Edit Profile */}
                <Route exact path="/profile/edit" render={ props => <ProfileForm history={props.history} {...props} />} />

                {/* View Profile */}
                <Route exact path="/profile" render={ props => <Profile history={props.history} {...props} />} />

                {/* Home */}
                <Route exact path="/" render={ props => { return <h1>HOME</h1>}} />
            </ProfileProvider>
        </>
    )
};