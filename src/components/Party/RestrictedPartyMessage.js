import React from "react"

export const RestrictedPartyMessage = props => {
    

    return (
        <main className="text-center p-5">
            <div className="m-5">
                This party is restricted to invited guests.
            </div>
            <button className="button btn-primary px-3 m-5" onClick={() => {props.history.go(-2)}}>Ok</button>
        </main>
    )
}