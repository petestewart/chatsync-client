import React, { useState } from 'react';

import './ShareModal.css'

export const ShareModal = (props) => {
    const [copied, setCopied] = useState(false)


    let myInput = null;
    const copyToClipboard = () => {
        myInput.select();
        document.execCommand("copy");
        setCopied(true)
        setTimeout(props.handleClose, 500)
    };


    return (
        <div className="share-modal">
            <div className="alert alert-warning alert-dismissible fade show " role="alert">
                <small>
                    {
                        copied
                        ?   <i className="fas fa-clipboard-check fa-2x"></i>
                        :   'Click below to copy link to clipboard:'
                    }
                    <br />
                    <input
                        className="w-75 text-center"
                        readOnly
                        value={props.link}
                        onClick={copyToClipboard}
                        ref={(ref) => (myInput = ref)}
                    />
                </small>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={props.handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}
