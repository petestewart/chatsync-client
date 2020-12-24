import React from "react"
import { Route } from "react-router-dom"

import ScrollToTop from './UI/ScrollToTop/ScrollToTop'

import { ChatProvider } from './ChatRoom/ChatProvider'
import { PartyProvider } from './Party/PartyProvider'
import { ProfileProvider } from './Profile/ProfileProvider'

import { Home } from "./Home/Home"
import { Party } from "./Party/Party"
import { PartyForm } from "./Party/PartyForm"
import { PartyList } from "./Party/PartyList"
import { Profile } from "./Profile/Profile"
import { ProfileForm } from "./Profile/ProfileForm"

import {FacebookExample} from "./UI/ReactionSelector/FacebookExample"

export const ApplicationViews = (props) => {
    return (
        <>
            <ProfileProvider>
                <PartyProvider>
                    {/* TEST */}
                    <ScrollToTop />
                    <Route exact path="/reactions" render={ props => <FacebookExample history={props.history} {...props} />} />

                    {/* Edit Profile */}
                    <ScrollToTop />
                    <Route exact path="/profile/edit" render={ props => <ProfileForm history={props.history} {...props} />} />

                    {/* View Profile */}
                    <ScrollToTop />
                    <Route exact path="/profile" render={ props => <Profile history={props.history} {...props} />} />

                    {/* View Parties List */}
                    <ScrollToTop />
                    <Route exact path="/parties/upcoming" render={ props => <PartyList history={props.history} {...props} />} />

                    {/* Party */}
                    <ChatProvider>
                        <Route exact path="/party/:id(\d+)" render={ props => <Party history={props.history} {...props} />} />
                    </ChatProvider>
                    
                    {/* Create Party */}
                    <ScrollToTop />
                    <Route exact path="/parties/create" render={ props => <PartyForm history={props.history} {...props} />} />

                    {/* Home */}
                    <ScrollToTop />
                    <Route exact path="/" render={ props => <Home history={props.history} {...props} />} />

                </PartyProvider>
            </ProfileProvider>
        </>
    )
};
