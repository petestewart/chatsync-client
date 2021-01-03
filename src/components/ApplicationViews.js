import React from "react"
import { Route } from "react-router-dom"

import ScrollToTop from './UI/ScrollToTop/ScrollToTop'

import { ChatProvider } from './ChatRoom/ChatProvider'

import { Channel } from "./Channel/Channel"
import { ChannelForm } from "./Channel/ChannelForm"
import { Home } from "./Home/Home"
import { Party } from "./Party/Party"
import { PartyForm } from "./Party/PartyForm"
import { PartyList } from "./Party/PartyList"
import { Profile } from "./Profile/Profile"
import { ProfileForm } from "./Profile/ProfileForm"

export const ApplicationViews = (props) => {
    return (
        <>
            {/* <ProfileProvider>
                <ChannelProvider>
                    <PartyProvider> */}
                        {/* Edit Profile */}
                        <ScrollToTop />
                        <Route exact path="/profile/edit" render={ props => <ProfileForm history={props.history} {...props} />} />

                        {/* View Own Profile */}
                        <ScrollToTop />
                        <Route exact path="/profile" render={ props => <Profile history={props.history} {...props} />} />

                        {/* View User Profile */}
                        <ScrollToTop />
                        <Route exact path="/profile/:id(\d+)" render={ props => <Profile history={props.history} {...props} />} />

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
                        
                        {/* Edit Party */}
                        <ScrollToTop />
                        <Route exact path="/party/edit/:id(\d+)" render={ props => <PartyForm history={props.history} {...props} />} />
                        
                        {/* Create Channel */}
                        <ScrollToTop />
                        <Route exact path="/channels/create" render={ props => <ChannelForm history={props.history} {...props} />} />
                        
                        {/* View Channel */}
                        <ScrollToTop />
                        <Route exact path="/channels/:id(\d+)" render={ props => <Channel history={props.history} {...props} />} />

                        {/* Home */}
                        <ScrollToTop />
                        <Route exact path="/" render={ props => <Home history={props.history} {...props} />} />

                    {/* </PartyProvider>
                </ChannelProvider>
            </ProfileProvider> */}
        </>
    )
};
