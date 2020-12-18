import React from "react"

export const ChatContext = React.createContext()

export const ChatProvider = (props) => {
    
    return (
        <ChatContext.Provider value={{firebaseInfo}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export const firebaseInfo = {
            apiKey: "AIzaSyALgLboaRpdiz584kKvzJ0qJNd-6SahHA4",
            authDomain: "superchat-fced2.firebaseapp.com",
            databaseURL: "https://superchat-fced2.firebaseio.com",
            projectId: "superchat-fced2",
            storageBucket: "superchat-fced2.appspot.com",
            messagingSenderId: "81562913345",
            appId: "1:81562913345:web:66125db20cee23cd3494c0"
    }