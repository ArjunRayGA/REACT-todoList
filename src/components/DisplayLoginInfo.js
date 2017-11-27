import React from 'react';
import HeaderInfoThing from './HeaderInfoThing';

const DisplayLoginInfo = (props) => {
    return (
        <div>
            <h1>ALL OF OUR LOGIN INFO, HERE! :-/</h1>
            <HeaderInfoThing title="username" content={props.username} />
            <HeaderInfoThing title="password" content={props.password} />
            <HeaderInfoThing title="token" content={props.token} />
        </div>
    );
};

export default DisplayLoginInfo;
