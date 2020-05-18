import './Description.scss';
import React, { useState } from 'react';

interface IDescriptionProps {
    calculatedBy: string;
    description: string;
    footNote?: string;
}

export const Description: React.FC<IDescriptionProps> = ({ description, calculatedBy, footNote = '' }) => {
    const [isVisible, updateIsVisible] = useState<boolean>(false);

    return (
        <div className="description">
            <button
                className={isVisible ? 'active' : ''}
                onClick={e => {
                    e.preventDefault();
                    updateIsVisible(!isVisible);
                }}
            >
                Description
            </button>
            <div className={`description__body${isVisible ? '' : ' description--hidden'}`}>
                <p>{description}</p>
                <p>
                    <strong>Calculated By:</strong> {calculatedBy}
                </p>
                <sup>{footNote}</sup>
            </div>
        </div>
    );
};
