import React, { useState } from "react"

export const ChannelContext = React.createContext()

export const ChannelProvider = (props) => {

    const [channel, setChannel] = useState({})

    const getChannel = (channelId) => {
        return fetch(`http://localhost:8000/channels/${channelId}`, {
            method : "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => response.json()
            .then(res => {
                setChannel(res)
                return(res)}
            ))
    };

    const deleteChannel = (channelId) => {
        return fetch(`http://localhost:8000/channels/${channelId}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => {
                return(res)}
            )
    };

    const getChannelsByMember = (memberId) => {
        return fetch(`http://localhost:8000/channels?member_id=${memberId}`, {
            method : "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {return(data.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))})
    };

    const createChannel = (channelInfo) => {
        return fetch('http://localhost:8000/channels', {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(channelInfo)
        })
            .then(response => response.json())
            .then(data => {return(data)})
    };

    const updateChannel = (channelInfo) => {
        return fetch(`http://localhost:8000/channels/${channelInfo.id}`, {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(channelInfo)
        })
            .then(response => response.json())
            .then(data => {return(data)})
    };

    // const createChannelMember = (channelId, memberId) => new Promise((resolve, reject) => {
    //     fetch('http://localhost:8000/channelmembers', {
    //         method : "POST",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             channel_id: channelId,
    //             member_id: memberId
    //         })
    //     })
    //         .then(response => resolve(response.json()))
    //         .then(err => reject(err))

    // }) 
        

    // const createChannelMember = (channelId, memberId) => {
    //     return fetch('http://localhost:8000/channelmembers', {
    //         method : "POST",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             channel_id: channelId,
    //             member_id: memberId
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {return(data)})
    // };

    const createChannelMember = async (channelId, memberId) => {
        console.log('createChannelMember')
        const response = await fetch('http://localhost:8000/channelmembers', {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                channel_id: channelId,
                member_id: memberId
            })
        });
        const data = await response.json();
        return (data);
    };

    // const deleteChannelMember = (channelId, memberId) => new Promise((resolve, reject) => {
    //     return fetch(`http://localhost:8000/channelmembers/${channelId}`, {
    //         method : "DELETE",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             member_id: memberId
    //         })
    //     })
    //         // .then(response => response.json())
    //         .then(data => resolve(data.json()))
    //         .catch((err) => reject(err))
    // })

    const deleteChannelMember = async (channelId, memberId) => {
        console.log('createChannelMember')

        const response = await fetch(`http://localhost:8000/channelmembers/${channelId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                member_id: memberId
            })
        });
        const data = await response.json();
        return (data);
    };

    // const deleteChannelMember = (channelId, memberId) => {
    //     return fetch(`http://localhost:8000/channelmembers/${channelId}`, {
    //         method : "DELETE",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("watchparty_token")}`,
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             member_id: memberId
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {return(data)})
    // };

    const setChannelMemberList = (channelId, newMembers) => {
        getChannel(channelId)
            .then((c) => {
                const promises = []
                // create array of pre-existing members' ids
                const currentMembers = []
                c.members.forEach((m) => currentMembers.push(m.member_id))
                // add all new members that aren't already pre-existing members
                newMembers.forEach((m) => {
                    if (!currentMembers.includes(m)) {
                        // promises.push(new Promise((resolve, reject) => {
                        //     createChannelMember(channelId, m)
                        //         .then(() => resolve(m))
                        //         .catch((err) => reject(err))
                        promises.push(
                            createChannelMember(channelId, m)
                                
                        )
                    }
                })
                // delete all pre-existing members not in new members list
                currentMembers.forEach((m) => {
                    if (!newMembers.includes(m)) {
                        // promises.push(new Promise((resolve, reject) => {
                        //     deleteChannelMember(channelId, m)
                        //         .then((r) => resolve(m))
                        //         .catch((err) => reject(err))
                        promises.push(
                            deleteChannelMember(channelId, m)
                        )
                    }
                })
                Promise.all(promises)
                    .then((res) => {
                        console.log(res)
                        return(res)
                    })
            })
    }

    return (
        <ChannelContext.Provider value={{
            channel, createChannel, createChannelMember, deleteChannelMember, getChannel, getChannelsByMember, updateChannel, setChannelMemberList, deleteChannel
        }} >
            {props.children}
        </ChannelContext.Provider>
    )
}