import React from 'react';

import './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={`backdrop${props.clear ? '-clear' : ''}`} onClick={props.clicked}></div> : null
);

export default backdrop;
