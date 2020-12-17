import React from "react"
import { Route } from "react-router-dom"

import { PartyProvider } from './Party/PartyProvider'
import { ProfileProvider } from './Profile/ProfileProvider'

import { Party } from "./Party/Party"
import { PartyForm } from "./Party/PartyForm"
import { PartyList } from "./Party/PartyList"
import { Profile } from "./Profile/Profile"
import { ProfileForm } from "./Profile/ProfileForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <ProfileProvider>
                <PartyProvider>
                    {/* Edit Profile */}
                    <Route exact path="/profile/edit" render={ props => <ProfileForm history={props.history} {...props} />} />

                    {/* View Profile */}
                    <Route exact path="/profile" render={ props => <Profile history={props.history} {...props} />} />

                    {/* View Parties List */}
                    <Route exact path="/parties/upcoming" render={ props => <PartyList history={props.history} {...props} />} />

                    {/* Party */}
                    <Route exact path="/party/:id(\d+)" render={ props => <Party history={props.history} {...props} />} />

                    {/* Create Party */}
                    <Route exact path="/parties/create" render={ props => <PartyForm history={props.history} {...props} />} />

                    {/* Home */}
                    <Route exact path="/" render={ props => { return <h1>HOME</h1>}} />
                </PartyProvider>
            </ProfileProvider>
        </>
    )
};
