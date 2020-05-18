import './Loader.scss';
import React from 'react';

export const Loader = (): React.ReactElement => {
    return (
        <div className="loader-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
